import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageContants"
import { useEffect, useRef } from "react";
import { addLanguageConfig } from "../utils/configSlice";
import { SEARCH_MOVIE_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import openai from "../utils/openai";
import { addGptSearchMovies, addMovieResults, addTmdbSearchMovies } from "../utils/gptSlice";

const GptSearchBar = () => {

    const searchTxt = useRef(null);
    const dispatch = useDispatch();
    const language = useSelector(store => store.appConfig.lang);

    const searchMovieInTmdb = async (movie) => {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGE2MTFlYzNjM2QyYzY5YjE0NzNjYzIxNjBmNmM3MyIsInN1YiI6IjYxYzQwYjY2YTkzZDI1MDA0MTNiZmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DRyxWu31gciKYBG-ekWy-rvBbfSow5Z2LhhdPFjpALw'
            }
        }
        const url = `${SEARCH_MOVIE_URL}${movie}&page=1`
        const data = await fetch(url, options);
        const json = await data.json();

        return json.results;
    }

    const handleGptSearchClick = async () => {
        // Make an api call to OpenAI and get the movie results.
        // const gptQuery = `Act as a movie recommendation system and suggest some movies for the query : ${searchTxt.current.value}. Only give me names of top 5 movies, comma separated like the example result given ahead. Example Result :  Shaly, 3 idiots, MI6, sex and city, tarzan`
        // const gptResults = await openai.chat.completions.create({
        //     messages: [{ role: 'user', content: gptQuery }],
        //     model: 'gpt-3.5-turbo',
        // });
        // const gptMovies = gptResults.choices.[0]?.message?.content.split(",");
        const gptMovies = ["Hera Pheri", "Andaz Apna Apna", "Chupke Chupke", "Golmaal: Fun Unlimited", "Dhamaal"]
        console.log("🚀 ~ handleGptSearchClick ~ gptMovies:", gptMovies)

        // For Each movie, i will search in TMDB for Data using the search movie api
        const promiseArray = gptMovies.map((movie) => searchMovieInTmdb(movie))

        const tmdbResults = await Promise.all(promiseArray);
        console.log("🚀 ~ handleGptSearchClick ~ tmdbResults:", tmdbResults)
        dispatch(addMovieResults({ movieNames: gptMovies, movieResults: tmdbResults }));
    }

    useEffect(() => {
        dispatch(addLanguageConfig(SUPPORTED_LANGUAGES[0].identifier));
        dispatch(addMovieResults({ movieName: null, movieResults: null }));
    }, [])

    return (
        <div className="pt-80 md:pt-[15%] flex justify-center">
            <form className="bg-black grid grid-cols-12 w-full md:w-1/2 rounded-md" onSubmit={(e) => e.preventDefault()}>
                <input ref={searchTxt} type="text" className="col-span-9 px-4 py-2 m-4 rounded-md" placeholder={lang[language].gptSearchBarPlaceholder} />
                <button className="col-span-3 bg-red-700 text-white m-4 rounded-md" onClick={handleGptSearchClick}>{lang[language].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar
