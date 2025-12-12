import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addPopularMovies } from '../utils/moviesSlice';

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(s => s.movies.popularMovies);

  const fetchMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)
    .then(res => res.json())
    .then(res => dispatch(addPopularMovies(res.results)))
    .catch(err => console.error(err));
  }

  useEffect(() => {
    !popularMovies && fetchMovies();
  }, []);
}

export default usePopularMovies;