import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GPTSuggessionMovies = () => {
  const movies = useSelector(store => store.gpt?.gptMovies);
  const movieNames = useSelector(store => store.gpt?.gptMovieNames);

  if(movieNames == null){
    return null;
  }

  return (
    <div className='p-4 m-4 bg-black text-white'>
      <div>
        {movieNames.map((movieName, index) => <MovieList key={movieName} title={movieName} movies={movies[index]}/>)}
      </div>
    </div>
  )
}

export default GPTSuggessionMovies