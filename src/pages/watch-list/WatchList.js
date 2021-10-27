import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getWatchList } from "../../store/actions";
// import FavoritesComp from "../../components/favorites/FavoritesComp";
import WishListComp from "../../components/wish-list/WishListComp";
const WatchList = () => {
	const movies = useSelector((state) => state.user.watchListedMovies);
	const tv = useSelector((state) => state.user.watchListedTv);
	const sessionId = useSelector((state) => state.user.sessionId);
	const [isMovie, setIsMovie] = useState(true);

	const dispatch = useDispatch();
	useEffect(() => {
		if (sessionId) {
			dispatch(getWatchList("movies", sessionId));
			dispatch(getWatchList("tv", sessionId));
		}
	}, [dispatch, sessionId]);
	const switchToMovies = () => {
		dispatch(getWatchList("movies", sessionId));
		setIsMovie(true);
	};
	const switchToTv = () => {
		dispatch(getWatchList("tv", sessionId));
		setIsMovie(false);
	};
	return (
		<section>
			<p className='m-10'>1</p>
			<div className=' m-10  flex items-center'>
				<p className='text-2xl font-semibold'>My Watch List</p>
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
				{isMovie && movies.length === 0 && <h1 className='text-3xl text-center font-semibold'>No watch list</h1>}
				{isMovie &&
					!!movies &&
					movies.map((movie) => {
						return (
							<div key={movie.id} className='m-3'>
								<WishListComp Media={movie} isMovie={isMovie} movies={movies} tv={tv} />
							</div>
						);
					})}
				{!isMovie && tv.length === 0 && <h1 className='text-3xl text-center font-semibold'>No watch list</h1>}
				{!isMovie &&
					!!tv &&
					tv.map((tvItem) => {
						return (
							<div key={tvItem.id} className='m-3'>
								<WishListComp Media={tvItem} isMovie={isMovie} movies={movies} tv={tv} />
							</div>
						);
					})}
			</div>
		</section>
	);
};

export default WatchList;
