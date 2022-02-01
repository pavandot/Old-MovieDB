import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaHeart } from "react-icons/fa";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleFavorites, getMovie, toggleWishList } from "../../store/actions";
import "./Movie.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Movie = () => {
	const dispatch = useDispatch();
	const navigateTo = useNavigate();
	const media = useSelector((state) => state.user.movieDetails);

	const sessionId = useSelector((state) => state.user.sessionId);
	const { id, title, rating, releaseDate, genres, totalRunTime, tagLine, overview, backgroundPoster, posterPath, isFavorite, isMovie, isWatchList } = media;
	const setIsFavorites = () => {
		const data = {
			media_type: isMovie ? "movie" : "tv",
			media_id: id,
			favorite: !isFavorite,
		};
		dispatch(getMovie({ ...media, isFavorite: !isFavorite }));
		dispatch(toggleFavorites(data, sessionId));
	};
	const watchListHandler = () => {
		const data = {
			media_type: isMovie ? "movie" : "tv",
			media_id: id,
			watchlist: !isWatchList,
		};
		dispatch(getMovie({ ...media, isWatchList: !isWatchList }));
		dispatch(toggleWishList(data, sessionId));
	};
	useEffect(() => {
		if (!media.id) {
			navigateTo("/");
		}
	}, [media, navigateTo]);
	return (
		<>
			{!!media.id && (
				<section className='sm:h-screen '>
					<div className='hidden sm:block'>
						<img src={backgroundPoster} alt='img' className='object-cover h-screen w-full' />
					</div>
					<div className=' absolute bg-black bg-opacity-90 top-0 left-0 sm:bottom-0 flex justify-center items-center w-full min-h-screen h-auto'>
						<div className='sm:bottom-0  w-full 	mt-16  flex flex-col sm:flex-row items-center max-w-7xl mx-auto'>
							<div className='sm:ml-10 mt-10 sm:mt-0 rounded-lg sm:overflow-hidden  '>
								<img src={posterPath} alt='imgs' width='300' className=' rounded-lg' />
							</div>
							<div className=' self-center mt-3 text-white p-10  sm:w-4/6 sm:flex-grow '>
								<h1 className='text-4xl font-bold mb-2'>
									{title} <span className='text-gray-300'>({releaseDate.slice(0, 4)})</span>
								</h1>
								<p className=''>
									<span className='movie-border-size text-gray-400 border-gray-400'>PG-13</span> &nbsp; {releaseDate} (IN) &nbsp; &#8226; &nbsp;{genres[0]}, {genres[1]} &nbsp; &#8226; &nbsp;{totalRunTime}
								</p>
								<div className='my-5 flex w-full items-center'>
									<div className='w-16 font-bold rating-position'>
										<CircularProgressbar
											value={rating}
											text={`${rating}%`}
											backgroundPadding={6}
											strokeWidth={6}
											styles={buildStyles({
												textSize: "30px",
												textColor: "white",
												backgroundColor: "#081C22",
												pathColor: "#21D07A",
											})}
											background={true}
										/>
									</div>
									<p className='font-bold ml-2'>
										User <br /> Score
									</p>
									<div className={`bg-primary ml-4 p-4 rounded-3xl cursor-pointer ${sessionId ? "block" : "hidden"} `} onClick={setIsFavorites}>
										<FaHeart className={`${isFavorite ? "text-red-600" : "text-white"}`} />
									</div>
									<div className={`bg-primary ml-4 p-4 rounded-3xl cursor-pointer ${sessionId ? "block" : "hidden"}`} onClick={watchListHandler}>
										{isWatchList ? <BsBookmarkCheckFill className='text-white' /> : <BsBookmark />}
									</div>
								</div>
								<p className='mb-3 italic text-gray-300'>{tagLine}</p>
								<h1 className='mb-2 text-xl font-bold'>Overview</h1>
								<p>{overview}</p>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Movie;
