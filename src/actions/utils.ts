import { AppThunkDispatch, create } from "./creators";

export const clearCache = create("CLEAR_CACHE");

export const clearAllErrors = (dispatch: AppThunkDispatch) => {
  dispatch(clearCache());
};
