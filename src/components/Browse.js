import Header from "./Header"
import useFetchMoviesMovies from "../hooks/useFetchMoviesMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
    useFetchMoviesMovies();
    const gptToggler = useSelector(store => store.gpt.gptSearchToggle);

    return (
        <div>
            <Header />
            {gptToggler ? (<GptSearch />) : (
                <>
                    <MainContainer />
                    <SecondaryContainer />
                </>
            )}

        </div>
    )
}

export default Browse
