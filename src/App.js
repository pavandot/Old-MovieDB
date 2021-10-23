import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Favorites from "./pages/favorites/Favorites";
import Search from "./pages/search/Search";

// Actions
import { fetchUser, setSessionId } from "./store/actions/userAction";

const sessionId = localStorage.getItem("sessionId");
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		if (!!sessionId) {
			dispatch(setSessionId(sessionId));
			dispatch(fetchUser(sessionId));
		}
	}, [dispatch]);
	return (
		<section>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/favorites'>
						<Favorites />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/search'>
						<Search />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</section>
	);
}

export default App;
