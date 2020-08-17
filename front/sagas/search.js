import { all, fork, put, call, throttle } from 'redux-saga/effects';
import axios from 'axios';

import {
  AUTO_COMPLETE_FAILURE,
  AUTO_COMPLETE_REQUEST,
  AUTO_COMPLETE_SUCCESS,
} from '../reducers/search';

function autocompleteUserAPI(data) {
  if (data === '') {
    return { data: [] };
  }
  return axios.get(`/user/${data}/search`);
}
function autocompleteTagAPI(data) {
  if (data === '') {
    return { data: [] };
  }
  return axios.get(`/tag/${data}/search`);
}
function* autocomplete(action) {
  try {
    let data = [];
    if (action.data[0] === '#') {
      const tag = yield call(autocompleteTagAPI, action.data.slice(1));
      data = tag.data.map((v) => ({ value: `#${v.name}` }));
    } else if (action.data[0] === '@') {
      const user = yield call(autocompleteUserAPI, action.data.slice(1));
      data = user.data.map((v) => ({ value: v.username }));
    } else {
      const tag = yield call(autocompleteTagAPI, action.data);
      const user = yield call(autocompleteUserAPI, action.data);
      data = user.data.map((v) => ({ value: v.username }));
      data = tag.data.map((v) => ({ value: `#${v.name}` })).concat(data);
    }
    yield put({
      type: AUTO_COMPLETE_SUCCESS,
      data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: AUTO_COMPLETE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAutoComplete() {
  yield throttle(5000, AUTO_COMPLETE_REQUEST, autocomplete);
}

export default function* userSaga() {
  yield all([
    fork(watchAutoComplete),
  ]);
}
