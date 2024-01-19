import { useEffect } from "react";
import { addTrailer } from "../utils/movieSlice";
import { API_TOKEN, VIDEO_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const useTrailerData = (id) => {
    const dispatch = useDispatch();

    const getMovieTrailer = async () => {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        }
        const url = `${VIDEO_BASE_URL}/${id}/videos`;
        const data = await fetch(url, options);
        const json = await data.json();
        const filterData = json.results.filter(item => item.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailer(trailer));
    }

    useEffect(() => {
        getMovieTrailer();
    }, [])
}

export default useTrailerData
