import { IoHeartCircle, IoCloseCircleOutline } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { toggleFavorites, getFavoriteMovies, getFavoriteTv } from "../../store/actions/userAction";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
const FavoritesComp = ({ Media, isMovie, movies, tv }) => {
	const sessionId = useSelector((state) => state.user.sessionId);
	const { id, title, posterImg, rating, date, overview } = Media;
	const dispatch = useDispatch();
	const removeFavorite = () => {
		if (isMovie) {
			const alteredData = movies.filter((movie) => movie.id !== id);
			dispatch(getFavoriteMovies(alteredData));
			const body = {
				media_type: "movie",
				media_id: id,
				favorite: false,
			};
			dispatch(toggleFavorites(body, sessionId));
		} else {
			const alteredData = tv.filter((tvItem) => tvItem.id !== id);
			dispatch(getFavoriteTv(alteredData));
			dispatch(
				toggleFavorites(
					{
						media_type: "tv",
						media_id: id,
						favorite: false,
					},
					sessionId
				)
			);
		}
	};
	return (
		<section className=''>
			<div className='rounded-lg  h-full flex flex-col sm:flex-row border-2 relative'>
				<div className='relative'>
					<img src={posterImg} alt={title} width='133' height='200' className=' w-full sm:hidden rounded-t-lg object-fill ' />
					<div className='w-10 font-bold absolute rating-position sm:hidden '>
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
				<img src={posterImg} alt={title} width='133' height='200' className='hidden sm:block rounded-tl-lg rounded-bl-lg object-fill' />
				<div className='p-5 w-full flex flex-col justify-between'>
					<div className='flex justify-start items-start sm:space-x-3 '>
						<div className='w-10 font-bold hidden sm:block '>
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
						<div className=''>
							<p className=' font-bold mt-4 sm:mt-0 '>{title}</p>
							<p className=' text-gray-500'>{date}</p>
						</div>
					</div>
					<div className='hidden sm:block'>
						<p>{overview}</p>
					</div>
					<div className=' flex justify-around mt-5 sm:justify-start sm:mt-0 space-x-4 '>
						<div className='flex items-center cursor-pointer'>
							<IoHeartCircle className='text-3xl text-red-500' />
							<span>Favorite</span>
						</div>
						<div className='flex items-center cursor-pointer hover:text-[#959595] ' onClick={removeFavorite}>
							<IoCloseCircleOutline className='text-3xl ' />
							<span>Remove</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FavoritesComp;
