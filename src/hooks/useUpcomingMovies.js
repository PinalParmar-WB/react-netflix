import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addUpcomingMovies } from '../utils/moviesSlice';

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector(s => s.movies.upcomingMovies);

  const fetchMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
    .then(res => res.json())
    .then(res => dispatch(addUpcomingMovies(res.results)))
    .catch(err => console.error(err));
  }

  useEffect(() => {
    !upcomingMovies && fetchMovies();
  }, []);
}

export default useUpcomingMovies;