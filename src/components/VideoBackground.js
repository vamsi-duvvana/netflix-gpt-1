import { useSelector } from "react-redux";
import useTrailerData from "../hooks/useTrailerData";

const VideoBackground = ({ id }) => {
    const trailer = useSelector(store => store.movies?.trailer);

    useTrailerData(id);

    return (
        <div className="w-screen">
            {trailer && (
                <iframe
                className="w-screen aspect-video"
                    src={`https://www.youtube.com/embed/${trailer?.key}?&autoplay=1&mute=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                >
                </iframe>
            )}

        </div>
    )
}

export default VideoBackground
