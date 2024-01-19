import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
    useNowPlayingMovies();

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
