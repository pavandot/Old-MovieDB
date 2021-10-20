import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { useScrollTo } from "react-use-window-scroll";
import React from "react";

// class component
// class Footer extends React.Component {
// 	render() {
// 		return (
// 			<div className='bg-primary text-white flex justify-between px-10 items-center h-16'>
// 				<Link to='/'>
// 					<h1 className='logo pointer text-2xl font-bold text-style  '>M D B</h1>
// 				</Link>
// 				<h1>Made with ❤️ by pavan</h1>
// 				<a href='#navbarId' className='hover:bg-white rounded h-7 w-7 flex justify-center items-center hover:text-primary transition duration-300'>
// 					<FaArrowUp />
// 				</a>
// 			</div>
// 		);
// 	}
// }

// Function component
const Footer = () => {
	const scrollTo = useScrollTo();
	return (
		<div className='bg-primary text-white flex justify-between px-10 items-center h-16'>
			<Link to='/'>
				<h1 className='logo pointer text-2xl font-bold text-style  '>M D B</h1>
			</Link>
			<h1>Made with ❤️ by pavan</h1>
			<p className='hover:bg-white rounded h-7 w-7 flex justify-center items-center hover:text-primary transition duration-300' onClick={() => scrollTo({ top: 0, left: 0, behavior: "smooth" })}>
				<FaArrowUp />
			</p>
		</div>
	);
};
export default Footer;
