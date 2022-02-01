import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Favorites from "./pages/favorites/Favorites";
import Search from "./pages/search/Search";
import Movie from "./pages/movie/Movie";
import WatchList from "./pages/watch-list/WatchList";

// Actions
import { fetchUser, setSessionId } from "./store/actions/";

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
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route index element={<Home />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/login' element={<Login />} />
					<Route path='/search' element={<Search />} />
					<Route path='/movie' element={<Movie />} />
					<Route path='/watchlist' element={<WatchList />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</section>
	);
}

export default App;
