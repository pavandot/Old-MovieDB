import axios from "axios";
import { GET_TOKEN, SET_SESSION_ID, GET_USER_DETAILS } from "../action-types/actionTypes";
import { setProgress, setAlert } from "./index";

// Setting User Details
const getToken = (token) => ({ type: GET_TOKEN, payload: token });

// Verifying User Login and Getting User Details
export const fetchGetToken = (userDetails) => async (dispatch) => {
	const url = "https://api.themoviedb.org/3/authentication";
	try {
		// Get The Token
		const token = await axios.get(`${url}/token/new?api_key=${process.env.REACT_APP_API_KEY}`).then((res) => res.data.request_token);
		dispatch(setProgress({ progress: 30, isHide: false, isCompleted: false }));

		// Verify the token with userName and Password
		const userData = {
			username: userDetails.userName,
			password: userDetails.password,
			request_token: token,
		};
		const verifiedToken = await axios.post(`${url}/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`, userData).then((res) => {
			console.log(res);
			if (res.status >= 400) {
				throw res;
			}
			return res.data.request_token;
		});
		dispatch(setProgress({ progress: 60, isHide: false, isCompleted: false }));
		const payload = { request_token: verifiedToken };

		// Get the Session Id
		const userSessionID = await axios.post(`${url}/session/new?api_key=${process.env.REACT_APP_API_KEY}`, payload).then((res) => res.data.session_id);
		dispatch(setProgress({ progress: 80, isHide: false, isCompleted: false }));
		localStorage.setItem("sessionId", userSessionID);

		// Get The User Details
		const user = await axios.get(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${userSessionID}`).then((res) => res.data);
		dispatch(setProgress({ progress: 100, isHide: true, isCompleted: false }));
		const id = user.id;
		const userName = user.username;
		const imgAddress = user.avatar.gravatar.hash;
		const img = `https://secure.gravatar.com/avatar/${imgAddress}.jpg?s=64`;

		// Update the store
		dispatch(getToken({ token, sessionId: userSessionID, user: { id, userName, img } }));
	} catch (error) {
		dispatch(setProgress({ progress: 100, isHide: true, isCompleted: false }));
		console.log(error.response);
		const status = error.response.status;
		const statusCode = error.response.data.status_code;
		if (status === 401 && statusCode === 30) {
			dispatch(setAlert({ text: "Invalid username and/or password", isVisible: true }));
		}
	}
};

// Restoring user Session
export const setSessionId = (sessionId) => ({ type: SET_SESSION_ID, payload: sessionId });

// Restore User Details
const setUserDetails = (data) => ({ type: GET_USER_DETAILS, payload: data });
// fetch user details
export const fetchUser = (sessionId) => async (dispatch, getState) => {
	const user = await axios.get(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`).then((res) => res.data);
	const id = user.id;
	const userName = user.username;
	const img = `https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`;
	dispatch(setUserDetails({ id, userName, img }));
};
