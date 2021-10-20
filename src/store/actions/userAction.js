import axios from "axios";

// Actions Types
import { GET_TOKEN, SET_SESSION_ID, SET_PROGRESS_BAR, GET_USER_DETAILS, GET_MOVIE_DETAILS, GET_TV_DETAILS } from "../action-types/actionTypes";

// UI Actions //
// Setting Progress Value
export const setProgress = (progressState) => ({ type: SET_PROGRESS_BAR, payload: progressState });

// User Actions //

// Setting User Details
export const getToken = (token) => ({ type: GET_TOKEN, payload: token });

// Verifying User Login and Getting User Details

export const fetchGetToken = (userDetails) => (dispatch, getState) => {
	const url = "https://api.themoviedb.org/3/authentication";
	// Get The Token
	axios.get(`${url}/token/new?api_key=${process.env.REACT_APP_API_KEY}`).then((res) => {
		dispatch(setProgress({ progress: 30, isHide: false }));
		if (res.data.success) {
			const token = res.data.request_token;
			const userData = {
				username: userDetails.userName,
				password: userDetails.password,
				request_token: token,
			};
			// Verify The Token With UserName And Password
			axios.post(`${url}/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`, userData).then((res) => {
				dispatch(setProgress({ progress: 60, isHide: false }));
				if (res.data.success) {
					const payload = { request_token: res.data.request_token };
					// Get The Session ID For The Current User
					axios.post(`${url}/session/new?api_key=${process.env.REACT_APP_API_KEY}`, payload).then((res) => {
						dispatch(setProgress({ progress: 80, isHide: false }));
						if (res.data.success) {
							const sessionId = res.data.session_id;
							// Get The User Details
							axios.get(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${res.data.session_id}`).then((res) => {
								if (!!res.data) {
									dispatch(setProgress({ progress: 100, isHide: true }));
									const id = res.data.id;
									const userName = res.data.username;
									const imgAddress = res.data.avatar.gravatar.hash;
									const img = `https://secure.gravatar.com/avatar/${imgAddress}.jpg?s=64`;
									dispatch(getToken({ token, sessionId, user: { id, userName, img } }));
								}
							});
						}
					});
				}
			});
		}
	});
};

// Restoring user Session
export const setSessionId = (sessionId) => ({ type: SET_SESSION_ID, payload: sessionId });

// Restore User Details
const setUserDetails = (data) => ({ type: GET_USER_DETAILS, payload: data });
// fetch user details
export const fetchUser = (sessionId) => async (dispatch, getState) => {
	const res = await axios.get(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`);
	const id = res.data.id;
	const userName = res.data.username;
	const imgAddress = res.data.avatar.gravatar.hash;
	const img = `https://secure.gravatar.com/avatar/${imgAddress}.jpg?s=64`;
	dispatch(setUserDetails({ id, userName, img }));
};

// Fetching Movies and Tv details
const getMovieDetails = (data) => ({ type: GET_MOVIE_DETAILS, payload: data });
const getTvDetails = (data) => ({ type: GET_TV_DETAILS, payload: data });

export const fetchMedialDetails = (mediaType, page) => (dispatch, getState) => {
	axios.get(`https://api.themoviedb.org/3/${mediaType}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`).then((res) => {
		let data = [];
		if (res.data.results) {
			res.data.results.forEach((element) => {
				const posterImg = `https://image.tmdb.org/t/p/w300${element.poster_path}`;
				const rating = element.vote_average * 10;
				const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				let dateSplit = "";
				let title = "";
				if (mediaType === "movie") {
					dateSplit = element.release_date.split("-");
					title = element.title;
				} else {
					dateSplit = element.first_air_date.split("-");
					title = element.name;
				}

				const date = `${month_names_short[parseInt(dateSplit[1]) - 1]} ${dateSplit[2]}, ${dateSplit[0]}`;
				data = [...data, { id: element.id, title, posterImg, rating, date }];
			});
		}
		if (mediaType === "movie") {
			dispatch(getMovieDetails(data));
		}
		if (mediaType === "tv") {
			dispatch(getTvDetails(data));
		}
	});
};
