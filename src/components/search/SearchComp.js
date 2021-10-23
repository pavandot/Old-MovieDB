import React from "react";

const SearchComp = ({ media }) => {
	const { id, title, posterImg, overview, date } = media;
	let shortOverview = "";
	if (overview.length > 229) {
		shortOverview = overview.slice(229);
		console.log(shortOverview);
	}
	// console.log(overview.slice(200));
	return (
		<section className='mb-5 mx-5 sm:mx-0'>
			<div className='rounded-lg  flex flex-col sm:flex-row border-2 relative'>
				<div className='relative'>
					<img src={posterImg} alt='matrix' width='133' height='200' className=' w-full sm:hidden rounded-t-lg object-fill ' />
				</div>
				<img src={posterImg} alt='matrix' width='94' height='144' className='hidden sm:block rounded-tl-lg rounded-bl-lg object-fill' />
				<div className='p-5 w-full flex flex-col justify-between'>
					<div className='flex justify-start items-start sm:space-x-3 '>
						<div className=''>
							<p className=' font-bold mt-4 sm:mt-0 '>{title}</p>
							<p className=' text-gray-500'>{date}</p>
						</div>
					</div>
					<div className='hidden sm:block'>
						<p className=' h-11 overflow-hidden'>{overview}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SearchComp;
