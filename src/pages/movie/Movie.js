import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./Movie.css";
const Movie = () => {
	const movie = useSelector((state) => state.user.movieDetails);
	const { title, rating, releaseDate, genres, totalRunTime, tagLine, overview, backgroundPoster, posterPath, isFavorite } = movie;
	return (
		<section className='sm:h-screen '>
			<div className='hidden sm:block'>
				<img src={backgroundPoster} alt='img' className='object-cover h-screen w-full' />
			</div>
			<div className=' absolute bg-black top-0 sm:bottom-0 left-0 w-full bg-opacity-90	mt-16  flex flex-col sm:flex-row items-center'>
				<div className='sm:ml-10 mt-10 sm:mt-0 rounded-lg sm:overflow-hidden '>
					<img src={posterPath} alt='imgs' width='300' className=' rounded-lg' />
				</div>
				<div className=' self-start mt-3 text-white p-10  sm:w-4/6 sm:flex-grow '>
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
						<div className='bg-primary ml-4 p-4 rounded-3xl'>
							<FaHeart className={`${isFavorite ? "text-red-600" : "text-white"}`} />
						</div>
						<div className='bg-primary ml-4 p-4 rounded-3xl'>
							<FaBookmark />
						</div>
					</div>
					<p className='mb-3 italic text-gray-300'>{tagLine}</p>
					<h1 className='mb-2 text-xl font-bold'>Overview</h1>
					<p>{overview}</p>
				</div>
			</div>
		</section>
	);
};

export default Movie;
