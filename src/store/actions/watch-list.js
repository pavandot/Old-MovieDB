import axios from "axios";
import { GET_WATCHLIST_MOVIES, GET_WATCHLIST_TV } from "../action-types/actionTypes";

// GET WATCH LIST MOVIES AND TV SHOWS
export const getWatchListMovie = (data) => ({ type: GET_WATCHLIST_MOVIES, payload: data });
export const getWatchListTv = (data) => ({ type: GET_WATCHLIST_TV, payload: data });

export const getWatchList = (mediaType, session_id) => (dispatch) => {
	axios.get(`https://api.themoviedb.org/3/account/%7Baccount_id%7D/watchlist/${mediaType}?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}&language=en-US&page=1`).then((res) => {
		// console.log(res);
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
			// console.log(data);
		}
		if (mediaType === "movies") {
			dispatch(getWatchListMovie(data));
		}
		if (mediaType === "tv") {
			dispatch(getWatchListTv(data));
		}
	});
};

export const toggleWishList = (body, session_id) => (dispatch) => {
	axios.post(`https://api.themoviedb.org/3/account/%7Baccount_id%7D/watchlist?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`, body).then((res) => {
		// console.log(res);
	});
};
