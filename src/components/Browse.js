import Header from "./Header"
import useFetchMoviesMovies from "../hooks/useFetchMoviesMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
    useFetchMoviesMovies();

    return (
        <div>
            <Header />
            <MainContainer />
            <SecondaryContainer />
            {/* 
                MainContainer
                    - VideoBackground
                    - Video title
                SecondaryContainer
                    - MovieList * n
                        - MovieCards * n
            
            */}
        </div>
    )
}

export default Browse
