import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';

import {
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_TYPE_POSTS_REQUEST,
  LOAD_TYPE_POSTS_SUCCESS,
  LOAD_TYPE_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  LOAD_COMMENT_REQUEST,
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  LOAD_LIKE_REQUEST,
  LOAD_LIKE_SUCCESS,
  LOAD_LIKE_FAILURE,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILURE,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_FAILURE,
  LOAD_BOOKMARK_REQUEST,
  LOAD_BOOKMARK_SUCCESS,
  LOAD_BOOKMARK_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_FAILURE,
  REMOVE_BOOKMARK_REQUEST,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadTypePostsAPI({ type, username }, lastId) {
  return axios.get(`/${type}/${username}?lastId=${lastId || 0}`);
}
function* loadTypePosts(action) {
  try {
    const result = yield call(loadTypePostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_TYPE_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TYPE_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data.PostId,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadCommentAPI(lastId) {
  return axios.get(`/comment?lastId=${lastId || 0}`);
}
function* loadComment(action) {
  try {
    const result = yield call(loadCommentAPI, action.lastId);
    yield put({
      type: LOAD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/comment/${data.postId}`, data);
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function removeCommentAPI(data) {
  return axios.delete(`/comment/${data}`);
}
function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadLikeAPI(data, lastId) {
  return axios.get(`/like/${data}?lastId=${lastId || 0}`);
}
function* loadLike(action) {
  try {
    const result = yield call(loadLikeAPI, action.data, action.lastId);
    yield put({
      type: LOAD_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_LIKE_FAILURE,
      error: err.response.data,
    });
  }
}

function addLikeAPI(data) {
  return axios.patch(`/like/${data}`);
}
function* addLike(action) {
  try {
    const result = yield call(addLikeAPI, action.data);
    yield put({
      type: ADD_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_LIKE_FAILURE,
      error: err.response.data,
    });
  }
}

function removeLikeAPI(data) {
  return axios.delete(`/like/${data}`);
}
function* removeLike(action) {
  try {
    const result = yield call(removeLikeAPI, action.data);
    yield put({
      type: REMOVE_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_LIKE_FAILURE,
      error: err.response.data,
    });
  }
}

function addBookmarkAPI(data) {
  return axios.patch(`/bookmark/${data}`);
}
function* addBookmark(action) {
  try {
    const result = yield call(addBookmarkAPI, action.data);
    yield put({
      type: ADD_BOOKMARK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_BOOKMARK_FAILURE,
      error: err.response.data,
    });
  }
}

function removeBookmarkAPI(data) {
  return axios.delete(`/bookmark/${data}`);
}
function* removeBookmark(action) {
  try {
    const result = yield call(removeBookmarkAPI, action.data);
    yield put({
      type: REMOVE_BOOKMARK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_BOOKMARK_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadTypePosts() {
  yield throttle(5000, LOAD_TYPE_POSTS_REQUEST, loadTypePosts);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLoadComment() {
  yield throttle(5000, LOAD_COMMENT_REQUEST, loadComment);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchLoadLike() {
  yield throttle(5000, LOAD_LIKE_REQUEST, loadLike);
}

function* watchAddLike() {
  yield takeLatest(ADD_LIKE_REQUEST, addLike);
}

function* watchRemoveLike() {
  yield takeLatest(REMOVE_LIKE_REQUEST, removeLike);
}

function* watchAddBookmark() {
  yield takeLatest(ADD_BOOKMARK_REQUEST, addBookmark);
}

function* watchRemoveBookmark() {
  yield takeLatest(REMOVE_BOOKMARK_REQUEST, removeBookmark);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchLoadTypePosts),
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchLoadComment),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchLoadLike),
    fork(watchAddLike),
    fork(watchRemoveLike),
    fork(watchAddBookmark),
    fork(watchRemoveBookmark),
    fork(watchUploadImages),
  ]);
}
