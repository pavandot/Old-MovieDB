import { SET_PROGRESS_BAR, SET_ALERT } from "../action-types/actionTypes";
// Setting Progress Value
export const setProgress = (progressState) => ({ type: SET_PROGRESS_BAR, payload: progressState });

export const setAlert = (alertType) => ({ type: SET_ALERT, payload: alertType });
