import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
const Navbar = () => {
	const sessionId = useSelector((state) => state.sessionId);
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
				{!!sessionId && <FaUserCircle className='text-2xl pointer' />}
			</div>
		</section>
	);
};

export default Navbar;
