// component
const Loader = ({ percentage }) => {
	return (
		<>
			<div>
				<div className='relative'>
					<div className='overflow-hidden h-2 text-xs flex  bg-purple-200'>
						<div style={{ width: `${percentage}%` }} className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary transition duration-300'></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Loader;
