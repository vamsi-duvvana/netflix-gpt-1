import { useSelector } from "react-redux"
import VideoTitle from "./VideoTitle"
import VideoBackground from "./VideoBackground"

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies)
    if (!movies) return;
    const randomNumber = Math.floor(Math.random() * 19);
    const mainMovie = movies[randomNumber];
    const { original_title, overview , id} = mainMovie;
    return (
        <div className="pt-[50%] bg-black md:pt-0">
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground id={id}/>
        </div>
    )
}

export default MainContainer
