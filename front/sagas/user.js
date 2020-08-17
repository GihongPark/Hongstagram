import { all, fork, takeLatest, put, call, throttle } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  AUTO_COMPLETE_FAILURE,
  AUTO_COMPLETE_REQUEST,
  AUTO_COMPLETE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
  REMOVE_PROFILE_IMAGE_REQUEST,
  REMOVE_PROFILE_IMAGE_SUCCESS,
  REMOVE_PROFILE_IMAGE_FAILURE,
} from '../reducers/user';
import { FOLLOW_TO_POST, UNFOLLOW_TO_POST } from '../reducers/post';

function loadMyInfoAPI() {
  return axios.get('/user');
}
function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}
function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post('/user/login', data);
}
function* logIn(action) {
  try {
    console.log('saga logIn');
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}
function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/user/signup', data);
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}
function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    console.log(result);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
    yield put({
      type: FOLLOW_TO_POST,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}
function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
    yield put({
      type: UNFOLLOW_TO_POST,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadProfileImageAPI(data) {
  return axios.post('/user/image', data);
}
function* uploadProfileImage(action) {
  try {
    const result = yield call(uploadProfileImageAPI, action.data);
    yield put({
      type: UPLOAD_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_PROFILE_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

function removeProfileImageAPI() {
  return axios.delete('/user/image');
}
function* removeProfileImage() {
  try {
    const result = yield call(removeProfileImageAPI);
    yield put({
      type: REMOVE_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_PROFILE_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchUploadProfileImage() {
  yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage);
}

function* watchRemoveProfileImage() {
  yield takeLatest(REMOVE_PROFILE_IMAGE_REQUEST, removeProfileImage);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchUploadProfileImage),
    fork(watchRemoveProfileImage),
  ]);
}
