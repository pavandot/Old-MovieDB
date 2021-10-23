import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "../../store/actions/userAction";
import FavoritesComp from "../../components/favorites/FavoritesComp";
import { useSelector } from "react-redux";
const sessionId = localStorage.getItem("sessionId");
const Favorites = () => {
	const movies = useSelector((state) => state.user.favoriteMovies);
	const tv = useSelector((state) => state.user.favoriteTv);
	const session_id = useSelector((state) => state.user.sessionId);
	const [isMovie, setIsMovie] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		if (sessionId) {
			dispatch(fetchFavorites("movies", 1, sessionId));
			dispatch(fetchFavorites("tv", 1, sessionId));
		} else {
			dispatch(fetchFavorites("movies", 1, session_id));
			dispatch(fetchFavorites("tv", 1, session_id));
		}
	}, [dispatch, session_id]);
	const switchToMovies = () => {
		dispatch(fetchFavorites("movies", 1, session_id));
		setIsMovie(true);
	};
	const switchToTv = () => {
		dispatch(fetchFavorites("tv", 1, session_id));
		setIsMovie(false);
	};
	return (
		<div className=''>
			<p className='m-10'>1</p>
			<div className=' m-10  flex items-center'>
				<p className='text-2xl font-semibold'>My Favorites</p>
				<div className='flex items-center mx-5 border-2 border-primary rounded-3xl  justify-between'>
					<div className={`py-1 px-3 ${isMovie ? "rounded-3xl bg-primary text-white " : "rounded-tl-3xl rounded-bl-3xl bg-white text-gray-800"} cursor-pointer `} onClick={switchToMovies}>
						<p>Movies</p>
					</div>
					<div className={`py-1 px-4 ${!isMovie ? "rounded-3xl bg-primary text-white " : "rounded-tr-3xl rounded-br-3xl bg-white text-gray-800"}   cursor-pointer `} onClick={switchToTv}>
						<p>TV</p>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-1 m-10'>
				{isMovie && movies.length === 0 && <h1 className='text-3xl text-center font-semibold'>No Favorites</h1>}
				{isMovie &&
					!!movies &&
					movies.map((movie) => {
						return (
							<div key={movie.id} className='m-3'>
								<FavoritesComp Media={movie} isMovie={isMovie} movies={movies} tv={tv} />
							</div>
						);
					})}
				{!isMovie && tv.length === 0 && <h1 className='text-3xl text-center font-semibold'>No Favorites</h1>}
				{!isMovie &&
					!!tv &&
					tv.map((tvItem) => {
						return (
							<div key={tvItem.id} className='m-3'>
								<FavoritesComp Media={tvItem} isMovie={isMovie} movies={movies} tv={tv} />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Favorites;
