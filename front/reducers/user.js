import produce from '../util/produce';

const initialState = {
  loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false, // 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,
  loadUserListLoading: false, // 유저 정보 가져오기 시도중
  loadUserListDone: false,
  loadUserListError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  uploadProfileImageLoading: false, // 프로필 이미지 업로드 시도중
  uploadProfileImageDone: false,
  uploadProfileImageError: null,
  removeProfileImageLoading: false, // 프로필 이미지 삭제 시도중
  removeProfileImageDone: false,
  removeProfileImageError: null,
  updateProfileLoading: false, // 프로필 변경 시도웆
  updateProfileDone: false,
  updateProfileError: null,
  me: null,
  userInfo: null,
  userList: [],
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_USER_LIST_REQUEST = 'LOAD_USER_LIST_REQUEST';
export const LOAD_USER_LIST_SUCCESS = 'LOAD_USER_LIST_SUCCESS';
export const LOAD_USER_LIST_FAILURE = 'LOAD_USER_LIST_FAILURE';

export const GUEST_LOG_IN_REQUEST = 'GUEST_LOG_IN_REQUEST';
export const GUEST_LOG_IN_SUCCESS = 'GUEST_LOG_IN_SUCCESS';
export const GUEST_LOG_IN_FAILURE = 'GUEST_LOG_IN_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const UPLOAD_PROFILE_IMAGE_REQUEST = 'UPLOAD_PROFILE_IMAGE_REQUEST';
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'UPLOAD_PROFILE_IMAGE_SUCCESS';
export const UPLOAD_PROFILE_IMAGE_FAILURE = 'UPLOAD_PROFILE_IMAGE_FAILURE';

export const REMOVE_PROFILE_IMAGE_REQUEST = 'REMOVE_PROFILE_IMAGE_REQUEST';
export const REMOVE_PROFILE_IMAGE_SUCCESS = 'REMOVE_PROFILE_IMAGE_SUCCESS';
export const REMOVE_PROFILE_IMAGE_FAILURE = 'REMOVE_PROFILE_IMAGE_FAILURE';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

export const AUTO_COMPLETE_REQUEST = 'AUTOCOMPLETE_REQUEST';
export const AUTO_COMPLETE_SUCCESS = 'AUTOCOMPLETE_SUCCESS';
export const AUTO_COMPLETE_FAILURE = 'AUTOCOMPLETE_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';
export const REMOVE_USER_LIST = 'REMOVE_USER_LIST';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoError = null;
      draft.loadMyInfoDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.me = action.data;
      draft.loadMyInfoDone = true;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;
    case LOAD_USER_REQUEST:
      draft.loadUserLoading = true;
      draft.loadUserError = null;
      draft.loadUserDone = false;
      break;
    case LOAD_USER_SUCCESS:
      draft.loadUserLoading = false;
      draft.userInfo = action.data;
      draft.loadUserDone = true;
      break;
    case LOAD_USER_FAILURE:
      draft.loadUserLoading = false;
      draft.loadUserError = action.error;
      break;
    case LOAD_USER_LIST_REQUEST:
      draft.loadUserListLoading = true;
      draft.loadUserListError = null;
      draft.loadUserListDone = false;
      break;
    case LOAD_USER_LIST_SUCCESS:
      draft.loadUserListLoading = false;
      draft.userList = action.data;
      draft.loadUserListDone = true;
      break;
    case LOAD_USER_LIST_FAILURE:
      draft.loadUserListLoading = false;
      draft.loadUserListError = action.error;
      break;
    case REMOVE_USER_LIST:
      draft.loadUserListDone = false;
      draft.userList = [];
      break;
    case GUEST_LOG_IN_REQUEST:
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
      break;
    case GUEST_LOG_IN_SUCCESS:
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.me = action.data;
      draft.logInDone = true;
      break;
    case GUEST_LOG_IN_FAILURE:
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutError = null;
      draft.logOutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpError = null;
      draft.signUpDone = false;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followError = null;
      draft.followDone = false;
      break;
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.me.Follows += 1;
      draft.userInfo.isFollow = true;
      draft.userInfo.Followers += 1;
      draft.followDone = true;
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowError = null;
      draft.unfollowDone = false;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unfollowLoading = false;
      draft.me.Follows -= 1;
      draft.userInfo.isFollow = false;
      draft.userInfo.Followers -= 1;
      draft.unfollowDone = true;
      break;
    case UNFOLLOW_FAILURE:
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
      break;
    case UPLOAD_PROFILE_IMAGE_REQUEST:
      draft.uploadProfileImageLoading = true;
      draft.uploadProfileImageDone = false;
      draft.uploadProfileImageError = null;
      draft.removeProfileImageLoading = false;
      draft.removeProfileImageDone = false;
      draft.removeProfileImageError = null;
      break;
    case UPLOAD_PROFILE_IMAGE_SUCCESS: {
      draft.me.src = action.data.replace(/\/thumb\//, '/original/');
      if (draft.userInfo) {
        draft.userInfo.src = action.data.replace(/\/thumb\//, '/original/');
      }
      draft.uploadProfileImageLoading = false;
      draft.uploadProfileImageDone = true;
      break;
    }
    case UPLOAD_PROFILE_IMAGE_FAILURE:
      draft.uploadProfileImageLoading = false;
      draft.uploadProfileImageError = action.error;
      break;
    case REMOVE_PROFILE_IMAGE_REQUEST:
      draft.removeProfileImageLoading = true;
      draft.removeProfileImageDone = false;
      draft.removeProfileImageError = null;
      draft.uploadProfileImageLoading = false;
      draft.uploadProfileImageDone = false;
      draft.uploadProfileImageError = null;
      break;
    case REMOVE_PROFILE_IMAGE_SUCCESS: {
      draft.me.src = null;
      if (draft.userInfo) {
        draft.userInfo.src = null;
      }
      draft.removeProfileImageLoading = false;
      draft.removeProfileImageDone = true;
      break;
    }
    case REMOVE_PROFILE_IMAGE_FAILURE:
      draft.removeProfileImageLoading = false;
      draft.removeProfileImageError = action.error;
      break;
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      draft.updateProfileLoading = true;
      draft.updateProfileDone = false;
      draft.updateProfileError = null;
      break;
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PROFILE_SUCCESS: {
      draft.me = action.data;
      draft.updateProfileLoading = false;
      draft.updateProfileDone = true;
      break;
    }
    case UPDATE_PASSWORD_FAILURE:
    case UPDATE_PROFILE_FAILURE:
      draft.updateProfileLoading = false;
      draft.updateProfileError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts += 1;
      if (draft.userInfo?.id === draft.me.id) {
        draft.userInfo.Posts += 1;
      }
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts -= 1;
      if (draft.userInfo?.id === draft.me.id) {
        draft.userInfo.Posts -= 1;
      }
      break;
    default:
      break;
  }
});

export default reducer;
