import React from "react";
import { useScrollTo } from "react-use-window-scroll";
import { useDispatch } from "react-redux";
// actions
import { fetchMedialDetails } from "../../store/actions/userAction";
const HomePages = ({ isMovie, isActive, setIsActive }) => {
	const scrollTo = useScrollTo();
	const dispatch = useDispatch();
	const btnHandler = (number) => {
		scrollTo({ top: 320 });
		const page = parseInt(number);
		setIsActive(page);
		if (isMovie) {
			dispatch(fetchMedialDetails("movie", number));
		}
		if (!isMovie) {
			dispatch(fetchMedialDetails("tv", page));
		}
	};
	return (
		<div className='flex items-center justify-center mb-4 group'>
			<button
				className={` ${
					isActive === 1 && "bg-primary text-white"
				} text-primary  border-l border-t border-b border-primary hover:bg-primary hover:text-white  font-bold uppercase text-xs px-4 py-2 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150  `}
				type='button'
				onClick={(e) => btnHandler(e.currentTarget.innerHTML)}>
				1
			</button>
			<button
				className={` ${
					isActive === 2 && "bg-primary text-white"
				} text-primary  border border-solid border-primary hover:bg-primary hover:text-white  font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
				type='button`}
				onClick={(e) => btnHandler(e.currentTarget.innerHTML)}>
				2
			</button>
			<button
				className={`${
					isActive === 3 && "bg-primary text-white"
				} text-primary  border-t border-b border-r border-primary hover:bg-primary hover:text-white  font-bold uppercase text-xs px-4 py-2 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
				type='button'
				onClick={(e) => btnHandler(e.currentTarget.innerHTML)}>
				3
			</button>
		</div>
	);
};

export default HomePages;
