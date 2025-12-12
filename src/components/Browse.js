import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import { useSelector } from 'react-redux';
import GPTSearchPage from './GPTSearchPage';

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const showGPT = useSelector(store => store.gpt.showGptSearch);
  
  return (
    <div>
        <Header/>
        {showGPT ? (
          <GPTSearchPage/>
        ) : (
          <>
            <MainContainer/>
            <SecondaryContainer/>
          </>
        )}
        
    </div>
  )
}

export default Browse