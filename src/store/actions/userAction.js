import axios from "axios";

// Actions Types
import { GET_TOKEN, SET_SESSION_ID, SET_PROGRESS_BAR, GET_USER_DETAILS, GET_MOVIE_DETAILS, GET_TV_DETAILS, GET_FAVORITE_MOVIES, GET_FAVORITE_TV, CLEAR_STORE, SEARCH_RESULT, GET_MOVIE } from "../action-types/actionTypes";

// UI Actions //

// Setting Progress Value
export const setProgress = (progressState) => ({ type: SET_PROGRESS_BAR, payload: progressState });

// User Actions //

// Setting User Details
export const getToken = (token) => ({ type: GET_TOKEN, payload: token });

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
		const verifiedToken = await axios.post(`${url}/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`, userData).then((res) => res.data.request_token);
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
		console.log(error);
	}
};

// export const fetchGetTokens = (userDetails) => (dispatch, getState) => {
// 	const url = "https://api.themoviedb.org/3/authentication";
// 	// Get The Token
// 	axios.get(`${url}/token/new?api_key=${process.env.REACT_APP_API_KEY}`).then((res) => {
// 		dispatch(setProgress({ progress: 30, isHide: false }));
// 		if (res.data.success) {
// 			const token = res.data.request_token;
// 			const userData = {
// 				username: userDetails.userName,
// 				password: userDetails.password,
// 				request_token: token,
// 			};
// 			// Verify The Token With UserName And Password
// 			axios.post(`${url}/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`, userData).then((res) => {
// 				dispatch(setProgress({ progress: 60, isHide: false }));
// 				if (res.data.success) {
// 					const payload = { request_token: res.data.request_token };
// 					// Get The Session ID For The Current User
// 					axios.post(`${url}/session/new?api_key=${process.env.REACT_APP_API_KEY}`, payload).then((res) => {
// 						dispatch(setProgress({ progress: 80, isHide: false }));
// 						if (res.data.success) {
// 							const sessionId = res.data.session_id;
// 							// Get The User Details
// 							axios.get(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${res.data.session_id}`).then((res) => {
// 								if (!!res.data) {
// 									dispatch(setProgress({ progress: 100, isHide: true }));
// 									const id = res.data.id;
// 									const userName = res.data.username;
// 									const imgAddress = res.data.avatar.gravatar.hash;
// 									const img = `https://secure.gravatar.com/avatar/${imgAddress}.jpg?s=64`;
// 									dispatch(getToken({ token, sessionId, user: { id, userName, img } }));
// 								}
// 							});
// 						}
// 					});
// 				}
// 			});
// 		}
// 	});
// };

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

// Fetching Movies and Tv details
export const getMovieDetails = (data) => ({ type: GET_MOVIE_DETAILS, payload: data });
export const getTvDetails = (data) => ({ type: GET_TV_DETAILS, payload: data });

export const fetchMedialDetails = (mediaType, page, session_id) => (dispatch, getState) => {
	axios.get(`https://api.themoviedb.org/3/${mediaType}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`).then((res) => {
		let data = [];
		if (res.data.results) {
			res.data.results.forEach((element) => {
				if (session_id) {
					axios.get(`https://api.themoviedb.org/3/${mediaType}/${element.id}/account_states?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`).then((res) => {
						const isFavorite = res.data.favorite;
						// console.log(res.data.favorite);
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
						data = [...data, { id: element.id, title, posterImg, rating, date, isFavorite }];
						if (mediaType === "movie") {
							dispatch(getMovieDetails(data));
							// dispatch(getTvDetails([]));
						}
						if (mediaType === "tv") {
							dispatch(getTvDetails(data));
							// dispatch(getMovieDetails([]));
						}
					});
				} else {
					const isFavorite = false;
					console.log(isFavorite);
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
					data = [...data, { id: element.id, title, posterImg, rating, date, isFavorite }];
					if (mediaType === "movie") {
						dispatch(getMovieDetails(data));
						// dispatch(getTvDetails([]));
					}
					if (mediaType === "tv") {
						dispatch(getTvDetails(data));
						// dispatch(getMovieDetails([]));
					}
				}
			});
		}
	});
};

// Get Favorites movies and tv shows

export const getFavoriteMovies = (data) => ({ type: GET_FAVORITE_MOVIES, payload: data });
export const getFavoriteTv = (data) => ({ type: GET_FAVORITE_TV, payload: data });
export const fetchFavorites = (mediaType, page, session_id) => (dispatch, getState) => {
	axios.get(`https://api.themoviedb.org/3/account/%7Baccount_id%7D/favorite/${mediaType}?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}&language=en-US&page=1`).then((res) => {
		let data = [];
		if (res.data.results) {
			let totalPage = res.data.total_pages;
			res.data.results.forEach((element) => {
				const posterImg = `https://image.tmdb.org/t/p/w300${element.poster_path}`;
				const rating = element.vote_average * 10;
				const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				let dateSplit = "";
				let title = "";
				const overview = element.overview;
				if (mediaType === "movies") {
					dateSplit = element.release_date.split("-");
					title = element.title;
				} else {
					dateSplit = element.first_air_date.split("-");
					title = element.name;
				}

				const date = `${month_names_short[parseInt(dateSplit[1]) - 1]} ${dateSplit[2]}, ${dateSplit[0]}`;
				data = [...data, { id: element.id, title, posterImg, rating, date, overview, totalPage }];
			});
		}
		if (mediaType === "movies") {
			dispatch(getFavoriteMovies(data));
		}
		if (mediaType === "tv") {
			dispatch(getFavoriteTv(data));
		}
	});
};

//
export const toggleFavorites = (body, session_id, media_type) => (dispatch, getState) => {
	console.log(session_id);
	axios.post(`https://api.themoviedb.org/3/account/11236813/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`, body).then((res) => {});
};

// Clear Redux Store
export const clearReduxStore = () => ({ type: CLEAR_STORE });

// search movies and tv shows
export const setSearchResult = (data) => ({ type: SEARCH_RESULT, payload: data });

export const getSearchResult = (keyWord) => async (dispatch, getState) => {
	// search movies
	const { totalPages, totalResult, movieResult } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${keyWord}&page=1&include_adult=false`).then((res) => {
		console.log(res);
		const totalPages = res.data.total_pages;
		const totalResult = res.data.total_results;
		const movieResult = res.data.results;
		return { totalPages, totalResult, movieResult };
	});
	let movies = [];
	movieResult.forEach((movie) => {
		const id = movie.id;
		const title = movie.title;
		let posterImg = "";
		if (movie.poster_path) {
			posterImg = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
		} else {
			posterImg = "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
		}
		const overview = movie.overview;
		const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let dateSplit = [];
		if (movie.release_date) {
			dateSplit = movie.release_date.split("-");
		}
		const date = `${month_names_short[parseInt(dateSplit[1]) - 1]} ${dateSplit[2]}, ${dateSplit[0]}`;
		if (!!date && !!overview) {
			movies.push({ id, title, posterImg, overview, date });
		}
	});
	const moviesResults = { movies, totalPages, totalResult };

	// search Tv Shows
	const { tvTotalPages, tvTotalResult, tvResult } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${keyWord}&page=1&include_adult=false`).then((res) => {
		console.log(res);
		const tvTotalPages = res.data.total_pages;
		const tvTotalResult = res.data.total_results;
		const tvResult = res.data.results;
		return { tvTotalPages, tvTotalResult, tvResult };
	});
	let tvShowsArr = [];
	tvResult.forEach((tv) => {
		const id = tv.id;
		const title = tv.name;
		let posterImg = "";
		if (tv.poster_path) {
			posterImg = `https://image.tmdb.org/t/p/w300${tv.poster_path}`;
		} else {
			posterImg = "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
		}
		const overview = tv.overview;
		const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let dateSplit = [];
		if (tv.first_air_date) {
			dateSplit = tv.first_air_date.split("-");
		}
		const date = `${month_names_short[parseInt(dateSplit[1]) - 1]} ${dateSplit[2]}, ${dateSplit[0]}`;
		if (!!date && !!overview) {
			tvShowsArr.push({ id, title, posterImg, overview, date });
		}
	});
	const tvShowsResult = { tvShowsArr, tvTotalPages, tvTotalResult };
	dispatch(setSearchResult({ moviesRes: moviesResults, tvShows: tvShowsResult }));
};

// Get Movie
const getMovie = (data) => ({ type: GET_MOVIE, payload: data });

export const getMovieById = (id, history, media) => async (dispatch) => {
	try {
		const movieData = await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`).then((res) => res.data);
		console.log(movieData);
		let title = "";
		let releaseDate = "";
		let totalRunTime = "";
		if (media === "movie") {
			title = movieData.title;
			releaseDate = movieData.release_date.replaceAll("-", "/");
			const runtime = movieData.runtime;
			const hours = Math.floor(runtime / 60);
			const minutes = runtime % 60;
			totalRunTime = `${hours}h ${minutes}m`;
		}
		if (media === "tv") {
			title = movieData.name;
			releaseDate = movieData.first_air_date.replaceAll("-", "/");
			totalRunTime = `${movieData.runtime}m`;
		}
		const rating = movieData.vote_average * 10;
		let genres = [];
		movieData.genres.forEach((gen, index) => {
			console.log(index);
			if (index <= 1) {
				genres.push(`${gen.name}`);
			}
		});

		const tagLine = movieData.tagline;
		const overview = movieData.overview;
		const posterPath = `https://image.tmdb.org/t/p/w400/${movieData.poster_path}`;
		const backgroundPoster = `https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`;
		const data = { title, rating, releaseDate, genres, totalRunTime, tagLine, overview, backgroundPoster, posterPath };
		console.log(data);
		dispatch(getMovie(data));
		history.push("/movie");
	} catch (error) {
		console.log(error);
	}
};
