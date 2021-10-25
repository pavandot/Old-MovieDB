import { SET_PROGRESS_BAR } from "../action-types/actionTypes";
// Setting Progress Value
export const setProgress = (progressState) => ({ type: SET_PROGRESS_BAR, payload: progressState });
