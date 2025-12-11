const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video absolute pt-60 px-10 text-white bg-gradient-to-r from-black">
        <h1 className="font-bold text-6xl">{title}</h1>
        <p className="w-4/12 py-6 text-lg">{overview}</p>
        <div>
            <button className="bg-white rounded text-black text-xl py-5 px-10 ">▶️ Play</button>
            <button className="bg-gray-500 rounded text-white text-xl py-5 px-10 mx-4">ℹ️ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle