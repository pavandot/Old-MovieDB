// Ui Actions
export { setProgress, setAlert } from "./uiActions";

// User Login
export { fetchGetToken, setSessionId, fetchUser } from "./userLogin";

// Getting movies and tv Shows

export { fetchMedialDetails, getMovieDetails, getTvDetails, getFavoriteMovies, getFavoriteTv, fetchFavorites, toggleFavorites, getMovieById, getMovie } from "./getMedia";

//  Search movies and tv Shows

export { getSearchResult } from "./searchMedia";

// common actions

export { clearReduxStore } from "./common";

// watch list

export { getWatchListMovie, getWatchListTv, toggleWishList } from "./watch-list";
