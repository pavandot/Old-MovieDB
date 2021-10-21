import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserDropDown } from "./UserDropDown";
import Loader from "../loader/Loader";
import "./Navbar.css";
const Navbar = () => {
	const dropDownRef = useRef();
	const [isOpen, setIsOpen] = useState(false);
	const sessionId = useSelector((state) => state.user.sessionId);
	const ui = useSelector((state) => state.ui);
	const img = useSelector((state) => state.user.user.img);
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (isOpen && dropDownRef.current && !dropDownRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", checkIfClickedOutside);
		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [isOpen]);
	return (
		<div className='fixed z-50 w-full top-0'>
			<section className='bg-primary text-white flex justify-between px-10 items-center h-16  ' id='navbarId'>
				<div className='left flex space-x-10 items-center'>
					<Link to='/'>
						<h1 className='logo pointer text-3xl font-bold text-style  '>MDB</h1>
					</Link>
					<h1 className='pointer font-semibold text-lg'>Movies</h1>
					<h1 className='pointer font-semibold text-lg'>TV Shows</h1>
				</div>
				<div className='right flex space-x-10 items-center text-lg'>
					{!!sessionId && <h1 className='pointer font-semibold'>Watch List</h1>}
					{!!sessionId && (
						<Link to='/favorites'>
							<h1 className='pointer font-semibold'>Favorite</h1>
						</Link>
					)}
					{!!!sessionId && (
						<Link to='/login'>
							<h1 className='pointer font-semibold'>Login</h1>
						</Link>
					)}
					<div ref={dropDownRef}>
						{!!sessionId && !!!img && <FaUserCircle className='text-2xl pointer' onClick={() => setIsOpen(!isOpen)} />}
						{!!sessionId && !!img && <img src={img} alt='userPhoto' width='35' height='35' className='rounded-full cursor-pointer' onClick={() => setIsOpen(!isOpen)} />}

						{isOpen && <UserDropDown setIsOpen={setIsOpen} />}
					</div>
				</div>
			</section>
			{!ui.isHide && <Loader percentage={ui.progress} />}
		</div>
	);
};

export default Navbar;
