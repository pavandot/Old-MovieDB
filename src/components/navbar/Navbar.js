import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserDropDown } from "./UserDropDown";
import "./Navbar.css";
const Navbar = () => {
	const dropDownRef = useRef();
	const [isOpen, setIsOpen] = useState(false);
	const sessionId = useSelector((state) => state.user.sessionId);
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
		<section className='bg-primary text-white flex justify-between px-10 items-center h-16 ' id='navbarId'>
			<div className='left flex space-x-10 items-center'>
				<Link to='/'>
					<h1 className='logo pointer text-2xl font-bold text-style  '>M D B</h1>
				</Link>
				<h1 className='pointer font-semibold'>Movies</h1>
				<h1 className='pointer font-semibold'>TV Shows</h1>
			</div>
			<div className='right flex space-x-10 items-center'>
				{!!sessionId && <h1 className='pointer font-semibold'>Watch List</h1>}
				{!!sessionId && <h1 className='pointer font-semibold'>Favorite</h1>}
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
	);
};

export default Navbar;
