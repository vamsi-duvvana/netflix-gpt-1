import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const GptMovieSuggestions = () => {

    const { movieNames, movieResults } = useSelector(store => store.gpt);
    if (!movieNames) return null;

    return (
        <div className="p-4 m-4 bg-black text-white bg-opacity-65">
            {movieNames.map((name, i) => {
                return (
                    <div>
                        <MovieList key={movieResults[0].id} title={name} movies={movieResults[i]} />
                    </div>
                )
            })}
        </div>
    )
}

export default GptMovieSuggestions
