import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getSearchResult } from "../../store/actions/";

// component
const HomeHero = () => {
	// const searchResult = useSelector((state) => state.user.searchResult);
	const searchRef = useRef();
	const dispatch = useDispatch();
	const history = useHistory();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(getSearchResult(searchRef.current.value));
		setTimeout(() => {
			searchRef.current.value = "";
			history.push("/search");
		}, 750);
	};
	return (
		<section className=' h-80 relative overflow-hidden mt-16' id='media-top'>
			<img src='https://image.tmdb.org/t/p/original/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg' alt='img' className='w-full h-full sm:h-auto bg-contain ' />
			<div className='absolute bg-primary top-0 bottom-0 left-0 w-full bg-opacity-60'>
				<div className=' m-4 sm:m-6 md:m-10 '>
					<div>
						<h1 className='text-4xl sm:text-4xl pb-2 md:text-6xl font-bold text-white pt-5'>Welcome.</h1>
						<p className=' text-lg sm:text-1xl md:text-3xl text-white font-bold'>Millions of movies, TV shows and people to discover. Explore now.</p>
					</div>
					<form className='flex w-full justify-center items-center pt-10' onSubmit={submitHandler}>
						<input type='text' className=' w-full p-3 rounded-tl-3xl rounded-bl-3xl outline-none' placeholder='Search for a movies, tv shows' ref={searchRef} required />
						<button className='bg-gradient-to-r from-green-400 to-blue-500 h-full p-3 rounded-tr-3xl rounded-br-3xl text-white font-semibold w-28 text-center ' type='submit'>
							Search
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default HomeHero;
