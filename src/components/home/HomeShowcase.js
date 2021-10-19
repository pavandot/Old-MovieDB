import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillBookmarkCheckFill, BsBookmark, BsThreeDots } from "react-icons/bs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
const HomeShowcase = ({ isFavorite, setIsFavorite, Media }) => {
	const [isMovieMenu, setIsMovieMenu] = useState(false);
	const { id, title, posterImg, rating, date } = Media;
	let color = rating > 70 ? "#21D07A" : "#D2D531";

	return (
		<section className='inline-block h-72'>
			<div className='rounded-lg  relative h-full '>
				<img src={posterImg} alt={title} className='rounded-lg h-full w-full object-fill' />
				<div className='absolute top-3 right-3 cursor-pointer hover:bg-secondary transition duration-300 p-1 bg-gray-300 rounded-full ' onClick={() => setIsMovieMenu(!isMovieMenu)}>
					<BsThreeDots />
				</div>
				{isMovieMenu && (
					<div className='absolute movie-menu bg-white rounded border-2'>
						<div className='px-3 py-1 hover:bg-gray-200 '>
							<p className=' flex justify-start items-center cursor-pointer' onClick={() => setIsFavorite(!isFavorite)}>
								<span className='pr-2'>
									{!isFavorite && <AiOutlineHeart />}
									{isFavorite && <AiFillHeart className=' text-red-500 cursor-pointer' />}
								</span>
								Favorite
							</p>
						</div>
						<div className=' px-3 py-1 hover:bg-gray-200 '>
							<p className=' flex justify-start items-center cursor-pointer' onClick={() => setIsFavorite(!isFavorite)}>
								<span className='pr-2'>
									{!isFavorite && <AiOutlineHeart />}
									{isFavorite && <AiFillHeart className=' text-red-500 cursor-pointer' />}
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
