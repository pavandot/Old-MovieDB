import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// actions
import { fetchGetToken } from "../../store/actions/userAction";

// component
import LoginComp from "../../components/Login/LoginComp";

// page
const Login = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const userState = useSelector((state) => state.user);
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
			// localStorage.setItem("sessionId", userState.sessionId);
			history.replace("/");
		}
	}, [history, userState.sessionId]);

	return (
		<section className='mt-16 mb-28 sm:mb-0 '>
			<LoginComp userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} submitHandler={submitHandler} />
		</section>
	);
};

export default Login;
