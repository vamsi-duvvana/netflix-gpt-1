import MovieCard from "./MovieCard"

const MovieList = ({ title, movies }) => {
    return (
        <div className="overflow-x-scroll px-6">
            <h1 className="text-2xl py-4 text-white">{title}</h1>
            <div className="flex">
                {movies?.map(movie => {
                    return (
                        <div key={movie.id} >
                            <MovieCard movieTitle={movie.title} moviePoster={movie.poster_path} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MovieList