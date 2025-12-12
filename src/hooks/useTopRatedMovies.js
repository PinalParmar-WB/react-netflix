import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTopRatedMovies } from '../utils/moviesSlice';

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector(s => s.movies.topRatedMovies);

  const fetchMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)
    .then(res => res.json())
    .then(res => dispatch(addTopRatedMovies(res.results)))
    .catch(err => console.error(err));
  }

  useEffect(() => {
    !topRatedMovies && fetchMovies();
  }, []);
}

export default useTopRatedMovies;