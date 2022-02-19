// component
const LoginComp = ({ userName, setUserName, password, setPassword, submitHandler }) => {
	return (
		<section className='px-10 py-7 '>
			<h1 className='text-2xl font-semibold pb-1'>Login to your account</h1>
			<p>
				If you do not have an account, registering for an account is free and simple.{" "}
				<a href='https://www.themoviedb.org/signup' target='_blank' rel='noreferrer' className='text-secondary'>
					Click here
				</a>{" "}
				to get started.
			</p>
			<p className='pt-5'>
				If you signed up but didn't get your verification email,{" "}
				<a href='https://www.themoviedb.org/resend-email-verification' target='_blank' rel='noreferrer' className='text-secondary'>
					click here
				</a>{" "}
				to have it resent.
			</p>
			<p className='mt-5'>Demo Account:</p>
			<p className=' mt-3'>UserName: pavandot</p>
			<p>Password: 0850</p>
			<form className='py-5 ' onSubmit={submitHandler}>
				<div className='flex flex-col pb-5'>
					<label htmlFor='username'>Username</label>
					<input type='text' id='username' className='p-2 outline-none border border-secondary mt-3' value={userName} onChange={(e) => setUserName(e.target.value)} />
				</div>
				<div className='flex flex-col'>
					<label htmlFor='password'>Password</label>
					<input type='password' id='password' className='p-2 outline-none border border-secondary mt-3' value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<div className='mt-5'>
					<button type='submit' className=' bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary font-semibold transition duration-300 mr-2'>
						Login
					</button>
					<a href='https://www.themoviedb.org/reset-password' className=' text-secondary' target='_blank' rel='noreferrer'>
						Reset Password
					</a>
				</div>
			</form>
		</section>
	);
};

export default LoginComp;
