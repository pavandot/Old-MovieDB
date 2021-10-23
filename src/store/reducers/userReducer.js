import { GET_TOKEN, SET_SESSION_ID, GET_USER_DETAILS, GET_MOVIE_DETAILS, GET_TV_DETAILS, GET_FAVORITE_MOVIES, GET_FAVORITE_TV, CLEAR_STORE, SEARCH_RESULT } from "../action-types/actionTypes";
const initialState = {
	user: {},
	requestToken: 0,
	sessionId: 0,
	movies: [],
	tv: [],
	favoriteMovies: [],
	favoriteTv: [],
	searchResult: { moviesRes: { movies: [], totalPages: 0, totalResult: 0 }, tvShows: {} },
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
		case GET_MOVIE_DETAILS: {
			return { ...state, movies: actions.payload };
		}
		case GET_TV_DETAILS: {
			return { ...state, tv: actions.payload };
		}
		case GET_FAVORITE_MOVIES: {
			return { ...state, favoriteMovies: actions.payload };
		}
		case SEARCH_RESULT: {
			return { ...state, searchResult: actions.payload };
		}
		case GET_FAVORITE_TV: {
			return { ...state, favoriteTv: actions.payload };
		}
		case CLEAR_STORE: {
			console.log("what");
			return {
				user: {},
				requestToken: 0,
				sessionId: 0,
				movies: [],
				tv: [],
				favoriteMovies: [],
				favoriteTv: [],
			};
		}
		default: {
			return state;
		}
	}
};
