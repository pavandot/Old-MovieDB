import { SET_PROGRESS_BAR, SET_ALERT } from "../action-types/actionTypes";

const initialState = {
	progressBar: {
		progress: 0,
		isHide: true,
		isCompleted: false,
	},
	alertMessage: {
		text: "",
		isVisible: false,
	},
};
export const uiReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case SET_PROGRESS_BAR: {
			return { ...state, progressBar: actions.payload };
		}
		case SET_ALERT: {
			return { ...state, alertMessage: actions.payload };
		}
		default: {
			return state;
		}
	}
};
