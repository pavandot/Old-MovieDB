import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

// component
const Footer = () => {
	return (
		<div className='bg-primary text-white flex justify-between px-10 items-center h-16'>
			<Link to='/'>
				<h1 className='logo pointer text-2xl font-bold text-style  '>M D B</h1>
			</Link>
			<h1>Made with ❤️ by pavan</h1>
			<a href='#navbarId' className='hover:bg-white rounded h-7 w-7 flex justify-center items-center hover:text-primary transition duration-300'>
				<FaArrowUp />
			</a>
		</div>
	);
};

export default Footer;
