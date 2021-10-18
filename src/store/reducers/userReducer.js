import { GET_TOKEN, SET_SESSION_ID, GET_USER_DETAILS } from "../action-types/actionTypes";
const initialState = {
	user: {},
	requestToken: 0,
	sessionId: 0,
};
export const userReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case GET_TOKEN: {
			return { ...state, requestToken: actions.payload.token, sessionId: actions.payload.sessionId, user: actions.payload.user };
		}
		case SET_SESSION_ID: {
			return { ...state, sessionId: actions.payload };
		}
		case GET_USER_DETAILS: {
			return { ...state, user: actions.payload };
		}
		default: {
			return state;
		}
	}
};
