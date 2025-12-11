import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addNowPlayingMovies } from '../utils/moviesSlice';

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const fetchMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch(addNowPlayingMovies(res.results));
    })
    .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchMovies();
  }, []);
}

export default useNowPlayingMovies;