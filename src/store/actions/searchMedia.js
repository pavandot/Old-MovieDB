import axios from "axios";
import { SEARCH_RESULT } from "../action-types/actionTypes";

// search movies and tv shows
const setSearchResult = (data) => ({ type: SEARCH_RESULT, payload: data });

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
