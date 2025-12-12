import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';

const useTrailerVideo = (movieId) => {
    const dispatch = useDispatch();
    const trailer = useSelector(s => s.movies.trailerVideo)

    const fetchVideo = async () => {
        const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
        );
        const json = await data.json();

        const filteredTrailers = json.results.filter((v) => v.type === 'Trailer');
        const video =
        filteredTrailers.length === 0 ? json.results[0] : filteredTrailers[0];
        dispatch(addTrailerVideo(video));
    };

    useEffect(() => {
        !trailer && fetchVideo();
    }, []);
}

export default useTrailerVideo