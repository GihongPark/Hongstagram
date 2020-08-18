import produce from '../util/produce';

export const initialState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],
  hasMorePosts: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  loadCommentLoading: false,
  loadCommentDone: false,
  loadCommentError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  loadLikeLoading: false,
  loadLikeDone: false,
  loadLikeError: null,
  addLikeLoading: false,
  addLikeDone: false,
  addLikeError: null,
  removeLikeLoading: false,
  removeLikeDone: false,
  removeLikeError: null,
  loadBookmarkLoading: false,
  loadBookmarkDone: false,
  loadBookmarkError: null,
  addBookmarkLoading: false,
  addBookmarkDone: false,
  addBookmarkError: null,
  removeBookmarkLoading: false,
  removeBookmarkDone: false,
  removeBookmarkError: null,
};

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_TYPE_POSTS_REQUEST = 'LOAD_TYPE_POSTS_REQUEST';
export const LOAD_TYPE_POSTS_SUCCESS = 'LOAD_TYPE_POSTS_SUCCESS';
export const LOAD_TYPE_POSTS_FAILURE = 'LOAD_TYPE_POSTS_FAILURE';

export const LOAD_EXPLORE_POSTS_REQUEST = 'LOAD_EXPLORE_POSTS_REQUEST';
export const LOAD_EXPLORE_POSTS_SUCCESS = 'LOAD_EXPLORE_POSTS_SUCCESS';
export const LOAD_EXPLORE_POSTS_FAILURE = 'LOAD_EXPLORE_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_POSTS = 'REMOVE_POSTS';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const REMOVE_IMAGE_ALL = 'REMOVE_IMAGE_ALL';

export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST';
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS';
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const LOAD_LIKE_REQUEST = 'LOAD_LIKE_REQUEST';
export const LOAD_LIKE_SUCCESS = 'LOAD_LIKE_SUCCESS';
export const LOAD_LIKE_FAILURE = 'LOAD_LIKE_FAILURE';

export const ADD_LIKE_REQUEST = 'ADD_LIKE_REQUEST';
export const ADD_LIKE_SUCCESS = 'ADD_LIKE_SUCCESS';
export const ADD_LIKE_FAILURE = 'ADD_LIKE_FAILURE';

export const REMOVE_LIKE_REQUEST = 'REMOVE_LIKE_REQUEST';
export const REMOVE_LIKE_SUCCESS = 'REMOVE_LIKE_SUCCESS';
export const REMOVE_LIKE_FAILURE = 'REMOVE_LIKE_FAILURE';

export const LOAD_BOOKMARK_REQUEST = 'LOAD_BOOKMARK_REQUEST';
export const LOAD_BOOKMARK_SUCCESS = 'LOAD_BOOKMARK_SUCCESS';
export const LOAD_BOOKMARK_FAILURE = 'LOAD_BOOKMARK_FAILURE';

export const ADD_BOOKMARK_REQUEST = 'ADD_BOOKMARK_REQUEST';
export const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS';
export const ADD_BOOKMARK_FAILURE = 'ADD_BOOKMARK_FAILURE';

export const REMOVE_BOOKMARK_REQUEST = 'REMOVE_BOOKMARK_REQUEST';
export const REMOVE_BOOKMARK_SUCCESS = 'REMOVE_BOOKMARK_SUCCESS';
export const REMOVE_BOOKMARK_FAILURE = 'REMOVE_BOOKMARK_FAILURE';

export const FOLLOW_TO_POST = 'FOLLOW_TO_POST';
export const UNFOLLOW_TO_POST = 'UNFOLLOW_TO_POST';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_POST_SUCCESS:
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      draft.singlePost = action.data;
      break;
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false;
      draft.loadPostError = action.error;
      break;
    case LOAD_HASHTAG_POSTS_REQUEST:
    case LOAD_EXPLORE_POSTS_REQUEST:
    case LOAD_TYPE_POSTS_REQUEST:
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_HASHTAG_POSTS_SUCCESS:
    case LOAD_EXPLORE_POSTS_SUCCESS:
    case LOAD_TYPE_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.hasMorePosts = action.data.length === 12;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.hasMorePosts = action.data.length === 8;
      break;
    case LOAD_HASHTAG_POSTS_FAILURE:
    case LOAD_EXPLORE_POSTS_FAILURE:
    case LOAD_TYPE_POSTS_FAILURE:
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      // draft.mainPosts.unshift(action.data);
      // draft.imagePaths = [];
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS: {
      draft.imagePaths = action.data;
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      break;
    }
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.uploadImagesError = action.error;
      break;
    case LOAD_COMMENT_REQUEST:
      draft.loadCommentLoading = true;
      draft.loadCommentDone = false;
      draft.loadCommentError = null;
      break;
    case LOAD_COMMENT_SUCCESS: {
      draft.singlePost.Comments = draft.singlePost.Comments.concat(action.data);
      draft.loadCommentLoading = false;
      draft.loadCommentDone = true;
      break;
    }
    case LOAD_COMMENT_FAILURE:
      draft.loadCommentLoading = false;
      draft.loadCommentError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Comments.push(action.data);
      if (draft.singlePost?.Comments) {
        draft.singlePost.Comments = draft.singlePost.Comments.concat(action.data);
      }
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    case REMOVE_COMMENT_REQUEST:
      draft.removeCommentLoading = true;
      draft.removeCommentDone = false;
      draft.removeCommentError = null;
      break;
    case REMOVE_COMMENT_SUCCESS: {
      draft.singlePost.Comments = draft.singlePost.Comments.filter((v) => v.id !== action.data.CommentId);
      draft.removeCommentLoading = false;
      draft.removeCommentDone = true;
      break;
    }
    case REMOVE_COMMENT_FAILURE:
      draft.removeCommentLoading = false;
      draft.removeCommentError = action.error;
      break;
    case LOAD_LIKE_REQUEST:
      draft.loadLikeLoading = true;
      draft.loadLikeDone = false;
      draft.loadLikeError = null;
      break;
    case LOAD_LIKE_SUCCESS: {
      draft.singlePost.Likers = draft.singlePost.Likers.concat(action.data);
      draft.loadLikeLoading = false;
      draft.loadLikeDone = true;
      break;
    }
    case LOAD_LIKE_FAILURE:
      draft.loadLikeLoading = false;
      draft.loadLikeError = action.error;
      break;
    case ADD_LIKE_REQUEST:
      draft.addLikeLoading = true;
      draft.addLikeDone = false;
      draft.addLikeError = null;
      break;
    case ADD_LIKE_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers.push({ id: action.data.UserId });
      if (draft.singlePost?.Likers) {
        draft.singlePost.Likers.push({ id: action.data.UserId });
      }
      draft.addLikeLoading = false;
      draft.addLikeDone = true;
      break;
    }
    case ADD_LIKE_FAILURE:
      draft.addLikeLoading = false;
      draft.addLikeError = action.error;
      break;
    case REMOVE_LIKE_REQUEST:
      draft.removeLikeLoading = true;
      draft.removeLikeDone = false;
      draft.removeLikeError = null;
      break;
    case REMOVE_LIKE_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
      if (draft.singlePost?.Likers) {
        draft.singlePost.Likers = draft.singlePost.Likers.filter((v) => v.id !== action.data.UserId);
      }
      draft.removeLikeLoading = false;
      draft.removeLikeDone = true;
      break;
    }
    case REMOVE_LIKE_FAILURE:
      draft.removeLikeLoading = false;
      draft.removeLikeError = action.error;
      break;
    case ADD_BOOKMARK_REQUEST:
      draft.addBookmarkLoading = true;
      draft.addBookmarkDone = false;
      draft.addBookmarkError = null;
      break;
    case ADD_BOOKMARK_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Bookmarkers.push({ id: action.data.UserId });
      if (draft.singlePost?.Bookmarkers) {
        draft.singlePost.Bookmarkers.push({ id: action.data.UserId });
      }
      draft.addBookmarkLoading = false;
      draft.addBookmarkDone = true;
      break;
    }
    case ADD_BOOKMARK_FAILURE:
      draft.addBookmarkLoading = false;
      draft.addBookmarkError = action.error;
      break;
    case REMOVE_BOOKMARK_REQUEST:
      draft.removeBookmarkLoading = true;
      draft.removeBookmarkDone = false;
      draft.removeBookmarkError = null;
      break;
    case REMOVE_BOOKMARK_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Bookmarkers = post.Bookmarkers.filter((v) => v.id !== action.data.UserId);
      if (draft.singlePost?.Bookmarkers) {
        draft.singlePost.Bookmarkers = draft.singlePost.Bookmarkers.filter((v) => v.id !== action.data.UserId);
      }
      draft.removeBookmarkLoading = false;
      draft.removeBookmarkDone = true;
      break;
    }
    case REMOVE_BOOKMARK_FAILURE:
      draft.removeBookmarkLoading = false;
      draft.removeBookmarkError = action.error;
      break;
    case REMOVE_POSTS:
      draft.mainPosts = [];
      break;
    case REMOVE_IMAGE:
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
      break;
    case REMOVE_IMAGE_ALL:
      draft.imagePaths = [];
      break;
    case FOLLOW_TO_POST:
      if (draft.singlePost) {
        draft.singlePost.User.isFollow = true;
      }
      break;
    case UNFOLLOW_TO_POST:
      if (draft.singlePost) {
        draft.singlePost.User.isFollow = false;
      }
      break;
    default:
      break;
  }
});

export default reducer;
