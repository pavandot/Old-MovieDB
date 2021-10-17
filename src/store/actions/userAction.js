import axios from "axios";
import { GET_TOKEN, SET_SESSION_ID } from "../action-types/actionTypes";

// getting token
export const getToken = (token) => ({ type: GET_TOKEN, payload: token });

export const fetchGetToken = (userDetails) => (dispatch, getState) => {
	const url = "https://api.themoviedb.org/3/authentication";
	axios.get(`${url}/token/new?api_key=${process.env.REACT_APP_API_KEY}`).then((res) => {
		if (res.data.success) {
			const token = res.data.request_token;
			dispatch(getToken(token));
			const userData = {
				username: userDetails.userName,
				password: userDetails.password,
				request_token: token,
			};
			axios.post(`${url}/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`, userData).then((res) => {
				if (res.data.success) {
					const payload = { request_token: res.data.request_token };
					axios.post(`${url}/session/new?api_key=${process.env.REACT_APP_API_KEY}`, payload).then((res) => {
						if (res.data.success) {
							dispatch(getToken({ token, sessionId: res.data.session_id }));
						}
					});
				}
			});
		}
	});
};

export const setSessionId = (sessionId) => ({ type: SET_SESSION_ID, payload: sessionId });
