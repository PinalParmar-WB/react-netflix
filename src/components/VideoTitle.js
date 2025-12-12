const VideoTitle = ({ title, overview }) => {
  return (
    // Changed pt-20/md:pt-60 to pt-[20%] so it scales perfectly with the video height
    <div className="w-screen aspect-video absolute pt-[20%] px-6 md:px-24 text-white bg-gradient-to-r from-black">
      
      {/* Responsive Title Size */}
      <h1 className="font-bold text-2xl md:text-4xl lg:text-6xl">{title}</h1>
      
      {/* 
         Responsive Description:
         - hidden md:inline-block : Hide on mobile, show on tablet+
         - w-full md:w-3/4 lg:w-1/2 : Make it wider on tablets (3/4) so it's not too tall vertically
      */}
      <p className="hidden md:inline-block py-6 text-sm md:text-lg w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        {overview}
      </p>
      
      <div className="my-2 md:m-0">
        <button className="bg-white rounded text-black font-bold py-2 px-6 text-sm md:py-3 md:px-10 md:text-xl hover:bg-opacity-80 transition">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 rounded text-white bg-opacity-50 py-2 px-6 text-sm md:py-3 md:px-10 md:text-xl mx-2 hover:bg-opacity-80 transition">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;