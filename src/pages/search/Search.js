import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import SearchComp from "../../components/search/SearchComp";
import "./Search.css";
const Search = () => {
	const [isMovie, setIsMovie] = useState(true);
	const { moviesRes, tvShows } = useSelector((state) => state.user.searchResult);
	const { movies, totalPages, totalResult } = moviesRes;
	const { tvShowsArr, tvTotalPages, tvTotalResult } = tvShows;
	console.log(moviesRes);
	return (
		<section className='mt-16 w-full'>
			<div className='flex items-center border-2 py-3 px-10 space-x-2'>
				<BiSearch className='text-lg ' />
				<input type='text' placeholder='matrix' className='w-full outline-none italic' />
			</div>
			<div className='flex flex-col	sm:flex-row  sm:justify-between sm:mx-10 sm:my-5 sm:space-x-5'>
				<div className=' hidden sm:block w-1/4 shadow-md rounded-lg self-start'>
					<h1 className='bg-blue-400 text-left h-16 p-5 font-bold  text-lg text-white rounded-t-lg'>Search Results</h1>
					<ul className=' pt-3 spa'>
						<li className={`flex justify-between px-5 py-3 ${isMovie && "bg-gray-100 "} cursor-pointer `} onClick={() => setIsMovie(true)}>
							Movies <span className=' bg-white p-1 rounded-lg'>{movies.length}</span>
						</li>
						<li className={`flex justify-between px-5 py-3 ${!isMovie && "bg-gray-100"} cursor-pointer rounded-b-lg`} onClick={() => setIsMovie(false)}>
							Tv Shows <span className=' bg-white p-1 rounded-lg'>{tvShowsArr.length}</span>
						</li>
					</ul>
				</div>
				<div className=' sm:w-9/12 w-full'>
					{isMovie &&
						movies.length > 0 &&
						movies.map((movie) => {
							return (
								<div key={movie.id}>
									<SearchComp media={movie} />
								</div>
							);
						})}
					{!isMovie &&
						tvShowsArr.length > 0 &&
						tvShowsArr.map((tv) => {
							return (
								<div>
									<SearchComp media={tv} />
								</div>
							);
						})}
				</div>
			</div>
		</section>
	);
};

export default Search;
