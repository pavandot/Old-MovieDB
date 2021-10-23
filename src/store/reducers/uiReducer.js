import { SET_PROGRESS_BAR } from "../action-types/actionTypes";

const initialState = {
	progress: 0,
	isHide: true,
	isCompleted: false,
};
export const uiReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case SET_PROGRESS_BAR: {
			return { progress: actions.payload.progress, isHide: actions.payload.isHide, isCompleted: actions.payload.isCompleted };
		}
		default: {
			return state;
		}
	}
};
