import { POSTER_BASE_URL } from "../utils/constants"

const MovieCard = ({ moviePoster }) => {
    if(!moviePoster) return null;
    return (
        <div className="w-48 pr-4 h-auto hover:scale-110 transition duration-500 cursor-pointer">
            <img className="rounded-md" src={`${POSTER_BASE_URL}${moviePoster}`} alt="poster-img" />
            {/* <h1 className="text-white">{movieTitle}</h1> */}
        </div>
    )
}

export default MovieCard
