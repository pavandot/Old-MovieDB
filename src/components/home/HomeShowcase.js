import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillBookmarkCheckFill, BsBookmark, BsThreeDots } from "react-icons/bs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
// import { GET_MOVIE_DETAILS } from "../../store/action-types/actionTypes";
import { toggleFavorites, getMovieDetails, getTvDetails, getMovieById, getWatchListMovie, getWatchListTv, toggleWishList } from "../../store/actions/";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "../../pages/home/Home.css";
import { useHistory } from "react-router";
const HomeShowcase = ({ Media, sessionId, isMovie, index }) => {
	const movies = useSelector((state) => state.user.movies);
	const tv = useSelector((state) => state.user.tv);
	const [isMovieMenu, setIsMovieMenu] = useState(false);
	// const [isWatchList, setIsWatchList] = useState(false);
	const { id, title, posterImg, rating, date, isFavorite, isWatchList } = Media;
	const dispatch = useDispatch();
	const history = useHistory();
	let alterData = isMovie ? movies : tv;

	const favoriteHandler = () => {
		setIsMovieMenu(false);
		const data = {
			media_type: isMovie ? "movie" : "tv",
			media_id: id,
			favorite: !isFavorite,
		};
		alterData[index].isFavorite = !isFavorite;
		isMovie ? dispatch(getMovieDetails(alterData)) : dispatch(getTvDetails(alterData));
		dispatch(toggleFavorites(data, sessionId));
	};

	const watchListHandler = () => {
		setIsMovieMenu(false);
		const data = {
			media_type: isMovie ? "movie" : "tv",
			media_id: id,
			watchlist: !isWatchList,
		};
		alterData[index].isWatchList = !isWatchList;
		isMovie ? dispatch(getMovieDetails(alterData)) : dispatch(getTvDetails(alterData));
		dispatch(toggleWishList(data, sessionId));
	};
	const sendID = () => {
		if (isMovie) {
			dispatch(getMovieById(id, history, "movie", sessionId));
		}
		if (!isMovie) {
			dispatch(getMovieById(id, history, "tv", sessionId));
		}
	};
	return (
		<section className='inline-block h-72 w-full'>
			<div className='rounded-lg  relative h-full '>
				<img src={posterImg} alt={title} className='rounded-lg h-full w-full object-fill cursor-pointer' onClick={sendID} />
				{!!sessionId && (
					<div className='absolute top-3 right-3 cursor-pointer hover:bg-secondary transition duration-300 p-1 bg-gray-300 rounded-full ' onClick={() => setIsMovieMenu(!isMovieMenu)}>
						<BsThreeDots />
					</div>
				)}
				{isMovieMenu && (
					<div className='absolute movie-menu  bg-white rounded border-2'>
						<div className='px-3 py-1 hover:bg-gray-200 '>
							<p className=' flex justify-start items-center cursor-pointer' onClick={favoriteHandler}>
								<span className='pr-2'>
									{!isFavorite && <AiOutlineHeart />}
									{isFavorite && <AiFillHeart className=' text-red-500 cursor-pointer' />}
								</span>
								Favorite
							</p>
						</div>
						<div className=' px-3 py-1 hover:bg-gray-200 '>
							<p className=' flex justify-start items-center cursor-pointer' onClick={watchListHandler}>
								<span className='pr-2'>
									{!isWatchList && <BsBookmark />}
									{isWatchList && <BsFillBookmarkCheckFill className='cursor-pointer' />}
								</span>
								Watch List
							</p>
						</div>
					</div>
				)}

				<div className='w-10 font-bold absolute z-40 rating-position'>
					<CircularProgressbar
						value={rating}
						text={`${rating}%`}
						backgroundPadding={6}
						strokeWidth={6}
						styles={buildStyles({
							textSize: "35px",
							textColor: "white",
							backgroundColor: "#081C22",
							pathColor: "#21D07A",
						})}
						background={true}
					/>
				</div>
			</div>
			<div className='mx-3 my-3 mt-7'>
				<p className=' font-bold'>{title}</p>
				<p className=' text-gray-500'>{date}</p>
			</div>
		</section>
	);
};

export default HomeShowcase;
