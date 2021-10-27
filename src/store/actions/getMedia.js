import axios from "axios";
import { GET_MOVIE_DETAILS, GET_TV_DETAILS, GET_FAVORITE_TV, GET_FAVORITE_MOVIES, GET_MOVIE } from "../action-types/actionTypes";

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
						// console.log(res.data);
						const isWatchList = res.data.watchlist;
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
						axios.get(``);

						const date = `${month_names_short[parseInt(dateSplit[1]) - 1]} ${dateSplit[2]}, ${dateSplit[0]}`;
						data = [...data, { id: element.id, title, posterImg, rating, date, isFavorite, isWatchList }];
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
					// console.log(isFavorite);
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

// toggle favorites
export const toggleFavorites = (body, session_id, media_type) => (dispatch, getState) => {
	axios.post(`https://api.themoviedb.org/3/account/11236813/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`, body);
};

// Get Movie
export const getMovie = (data) => ({ type: GET_MOVIE, payload: data });

export const getMovieById = (id, history, media, sessionId) => async (dispatch) => {
	try {
		const movieData = await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`).then((res) => res.data);
		// console.log(movieData);
		let title = "";
		let releaseDate = "";
		let totalRunTime = "";
		let isFavorite = false;
		let isWatchList = false;
		let isMovie = true;
		if (sessionId) {
			const isUser = await axios.get(`https://api.themoviedb.org/3/${media}/${id}/account_states?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`).then((res) => {
				isFavorite = res.data.favorite;
				isWatchList = res.data.watchlist;
				return { isFavorite, isWatchList };
			});
			isFavorite = isUser.isFavorite;
			isWatchList = isUser.isWatchList;
		}
		// console.log(isFavorite);
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
			isMovie = false;
		}
		const rating = movieData.vote_average * 10;
		let genres = [];
		movieData.genres.forEach((gen, index) => {
			// console.log(index);
			if (index <= 1) {
				genres.push(`${gen.name}`);
			}
		});

		const tagLine = movieData.tagline;
		const overview = movieData.overview;
		const posterPath = `https://image.tmdb.org/t/p/w400/${movieData.poster_path}`;
		const backgroundPoster = `https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`;
		const data = { id, title, rating, releaseDate, genres, totalRunTime, tagLine, overview, backgroundPoster, posterPath, isFavorite, isWatchList, isMovie };
		// console.log(data);
		dispatch(getMovie(data));
		history.push("/movie");
	} catch (error) {
		// console.log(error);
	}
};
