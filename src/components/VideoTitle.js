const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video pt-[25%] px-6 md:px-20 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
            <p className="hidden md:inline-block py-6 text-sm w-1/4">{overview}</p>
            <div className="my-2 md:my-0">
                <button className="bg-white p-2 mr-2 font-sm font-semibold rounded-md px-5 md:px-10 text-black hover:bg-opacity-80">▶️ Play</button>
                <button className="hidden md:inline-block bg-gray-500 p-2 ml-2 text-white font-sm font-semibold rounded-md px-8 bg-opacity-50">More info</button>
            </div>
        </div>
    )
}

export default VideoTitle
