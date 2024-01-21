import MovieCard from "./MovieCard"

const MovieList = ({ title, movies }) => {
    return (
        <div className="px-6">
            <h1 className="text-xl md:text-2xl py-4 text-white">{title}</h1>
            <div className="flex overflow-x-scroll">
                {movies?.map(movie => {
                    return (
                        <div key={movie.id} >
                            <MovieCard moviePoster={movie.poster_path} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MovieList
