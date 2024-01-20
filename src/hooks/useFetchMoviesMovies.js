import { useDispatch } from "react-redux";
import { API_TOKEN, NOW_PLAYING_MOVIES_URL, POPULAR_MOVIES_URL, TOP_RATED_MOVIES_URL, UPCOMING_MOVIES_URL } from "../utils/constants";
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useFetchMoviesMovies = () => {
    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        }
        const data = await fetch(NOW_PLAYING_MOVIES_URL, options);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results))
    }

    const getPopularMovies = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            },
        }
        const data = await fetch(POPULAR_MOVIES_URL, options);
        const json = await data.json()
        dispatch(addPopularMovies(json.results));
    }

    const getUpcomingMovies = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            },
        }
        const data = await fetch(UPCOMING_MOVIES_URL, options);
        const json = await data.json();
        dispatch(addUpcomingMovies(json.results));
    }

    const getTopRatedMovies = async() => {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            },
        }
        const data = await fetch(TOP_RATED_MOVIES_URL, options);
        const json = await data.json();
        dispatch(addTopRatedMovies(json.results));
    }

    useEffect(() => {
        getNowPlayingMovies();
        getPopularMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])
}

export default useFetchMoviesMovies;
