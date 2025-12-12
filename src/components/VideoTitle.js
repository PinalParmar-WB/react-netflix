const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video absolute pt-20 md:pt-60 md:px-10 px-6 text-white bg-gradient-to-r from-black">
        <h1 className="font-bold text-lg md:text-6xl">{title}</h1>
        <p className="md:inline-block hidden w-4/12 py-6 text-lg">{overview}</p>
        <div className="my-4 md:m-0">
            <button className="bg-white rounded text-black text-sm md:text-xl md:py-5 md:px-10 px-2 py-1">▶️ Play</button>
            <button className="md:inline-block hidden bg-gray-500 rounded text-white text-xl py-5 px-10 mx-4">ℹ️ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle