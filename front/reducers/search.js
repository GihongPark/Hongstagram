import produce from '../util/produce';

const initialState = {
  autoCompleteLoading: false, // 자동완성 시도중
  autoCompleteDone: false,
  autoCompleteError: null,
  autoComplete: [],
};

export const AUTO_COMPLETE_REQUEST = 'AUTOCOMPLETE_REQUEST';
export const AUTO_COMPLETE_SUCCESS = 'AUTOCOMPLETE_SUCCESS';
export const AUTO_COMPLETE_FAILURE = 'AUTOCOMPLETE_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case AUTO_COMPLETE_REQUEST:
      draft.autoCompleteLoading = true;
      draft.autoCompleteError = null;
      draft.autoCompleteDone = false;
      break;
    case AUTO_COMPLETE_SUCCESS:
      draft.autoCompleteLoading = false;
      draft.autoComplete = action.data;
      draft.autoCompleteDone = true;
      break;
    case AUTO_COMPLETE_FAILURE:
      draft.autoCompleteLoading = false;
      draft.autoComplete = [];
      draft.autoCompleteError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
