import { useDispatch } from "react-redux";
import { API_TOKEN, URL } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        }
        const data = await fetch(URL, options);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results))
    }

    useEffect(() => {
        getNowPlayingMovies();
    }, [])
}

export default useNowPlayingMovies;
