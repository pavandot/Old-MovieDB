import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//

// actions
import { fetchMedialDetails } from "../../store/actions/userAction";
// Components
import HomeHero from "../../components/home/HomeHero";
import HomeShowcase from "../../components/home/HomeShowcase";
import HomePages from "../../components/home/HomePages";

import "./Home.css";
import { useDispatch } from "react-redux";
// page
const Home = () => {
	const movies = useSelector((state) => state.user.movies);
	const tv = useSelector((state) => state.user.tv);
	const sessionId = useSelector((state) => state.user.sessionId);
	const dispatch = useDispatch();
	const [isMovie, setIsMovie] = useState(true);
	const [isActive, setIsActive] = useState(1);

	useEffect(() => {
		dispatch(fetchMedialDetails("movie", 1, sessionId));
		dispatch(fetchMedialDetails("tv", 1, sessionId));
	}, [dispatch, sessionId]);
	const switchToMovies = () => {
		dispatch(fetchMedialDetails("movie", 1, sessionId));
		setIsMovie(true);
		setIsActive(1);
	};
	const switchToTv = () => {
		dispatch(fetchMedialDetails("tv", 1, sessionId));
		setIsMovie(false);
		setIsActive(1);
	};
	return (
		<div className=''>
			<HomeHero />
			<div className='m-10 flex items-center'>
				<p className='text-2xl font-semibold'>Popular</p>
				<div className='flex items-center mx-5 border-2 border-primary rounded-3xl  justify-between'>
					<div className={`py-1 px-3 ${isMovie ? "rounded-3xl bg-primary text-white " : "rounded-tl-3xl rounded-bl-3xl bg-white text-gray-800"} cursor-pointer `} onClick={switchToMovies}>
						<p>Movies</p>
					</div>
					<div className={`py-1 px-4 ${!isMovie ? "rounded-3xl bg-primary text-white " : "rounded-tr-3xl rounded-br-3xl bg-white text-gray-800"}   cursor-pointer `} onClick={switchToTv}>
						<p>TV</p>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-5 m-10'>
				{isMovie &&
					!!movies &&
					movies.map((movie, index) => {
						return (
							<div key={movie.id} className='m-3'>
								<HomeShowcase Media={movie} sessionId={sessionId} isMovie={isMovie} index={index} />
							</div>
						);
					})}
				{!isMovie &&
					!!tv &&
					tv.map((tv, index) => {
						return (
							<div key={tv.id} className='m-3'>
								<HomeShowcase Media={tv} sessionId={sessionId} isMovie={isMovie} index={index} />
							</div>
						);
					})}
			</div>
			<div>
				<HomePages isMovie={isMovie} isActive={isActive} setIsActive={setIsActive} sessionId={sessionId} />
			</div>
		</div>
	);
};

export default Home;
