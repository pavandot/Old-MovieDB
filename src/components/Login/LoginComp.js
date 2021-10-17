import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

// actions
import { fetchGetToken } from "../../store/actions/userAction";
const LoginComp = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const userState = useSelector((state) => state);
	const history = useHistory();
	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		const userDetails = {
			userName,
			password,
		};
		dispatch(fetchGetToken(userDetails));
	};
	useEffect(() => {
		if (userState.sessionId) {
			localStorage.setItem("sessionId", userState.sessionId);
			history.replace("/");
		}
	}, [history, userState.sessionId]);
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
			<form className='py-10 ' onSubmit={submitHandler}>
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
