import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import New from "./pages/New";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/new",
				element: <New />,
			},
			{
				path: "/movies",
				element: <Movies />,
			},
			{
				path: "/tv-shows",
				element: <TvShows />,
			},
			{
				path: "/movie/:id",
				element: <MovieDetails />,
			},
			{
				path: "/tv/:id",
				element: <TvDetails />,
			},
			// Error Page
			{
				path: "*",
				element: <ErrorPage />,
			},
		],
	},
]);
