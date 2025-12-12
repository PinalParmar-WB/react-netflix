import React from 'react'
import VideoTitle from './VideoTitle';
import VideoBackgroud from './VideoBackgroud';
import { useSelector } from 'react-redux';

const MainContainer = () => {

    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if(movies == null) return;

    const mainMovie = movies[0];

    return (
        <div className='md:pt-0 pt-[30%] bg-black'>
            <VideoTitle title={mainMovie.title} overview={mainMovie.overview}/>
            <VideoBackgroud movieId={mainMovie.id}/>
        </div>
    )
}

export default MainContainer;