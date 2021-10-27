import axios from "axios";
import { GET_WATCHLIST_MOVIES, GET_WATCHLIST_TV } from "../action-types/actionTypes";

// GET WATCH LIST MOVIES AND TV SHOWS
export const getWatchListMovie = (data) => ({ type: GET_WATCHLIST_MOVIES, payload: data });
export const getWatchListTv = (data) => ({ type: GET_WATCHLIST_TV, payload: data });

export const toggleWishList = (body, session_id) => (dispatch) => {
	axios.post(`https://api.themoviedb.org/3/account/%7Baccount_id%7D/watchlist?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`, body).then((res) => {
		console.log(res);
	});
};
