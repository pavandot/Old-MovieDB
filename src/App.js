import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";

import { useDispatch } from "react-redux";
import { setSessionId } from "./store/actions/userAction";
const sessionId = localStorage.getItem("sessionId");
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		if (!!sessionId) {
			dispatch(setSessionId(sessionId));
		}
	}, [dispatch]);
	return (
		<section>
			<Router>
				<Switch>
					<Route exact path='/'>
						<Navbar />
						<Home />
						<Footer />
					</Route>
					<Route patch='/login'>
						<Navbar />
						<Login />
						<Footer />
					</Route>
				</Switch>
			</Router>
		</section>
	);
}

export default App;
