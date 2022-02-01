import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearReduxStore } from "../../store/actions/";
export const UserDropDown = ({ setIsOpen }) => {
	const { userName, img } = useSelector((state) => state.user.user);
	console.log(img);
	const history = useNavigate();
	const dispatch = useDispatch();
	const clearSession = () => {
		setIsOpen(false);
		localStorage.clear();
		dispatch(clearReduxStore());
		history("/");
		window.location.reload();
	};
	return (
		<div>
			<div className='absolute right-12 p-2 top-14 bg-white transform rotate-45'></div>
			<section className='absolute right-3 top-16 min-w-24 rounded  bg-white text-black flex flex-col justify-between z-50'>
				<div className='p-2 hover:bg-gray-200 rounded transition duration-300 text-gray-800 font-medium cursor-pointer' onClick={() => setIsOpen(false)}>
					<p>{userName}</p>
				</div>
				<div className='p-2 hover:bg-gray-200 rounded transition duration-300 text-gray-800 font-medium cursor-pointer sm:hidden' onClick={() => setIsOpen(false)}>
					<Link to='/favorites'>
						<h1>Favorite</h1>
					</Link>
				</div>
				<div className='p-2 hover:bg-gray-200 rounded transition duration-300 text-gray-800 font-medium cursor-pointer sm:hidden' onClick={() => setIsOpen(false)}>
					<Link to='/watchlist'>
						<h1>Watch List</h1>
					</Link>
				</div>
				<div className='p-2 hover:bg-gray-200 rounded transition duration-300 text-gray-800 font-medium cursor-pointer' onClick={clearSession}>
					<p>Logout</p>
				</div>
			</section>
		</div>
	);
};
