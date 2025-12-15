import React from 'react';
import GPTSearchBar from './GPTSearchBar';
import GPTSuggessionMovies from './GPTSuggessionMovies';
import { BACKGROUD_IMAGE } from '../utils/constants';

const GPTSearchPage = () => {
  return (
    <div>
      <div className="fixed -z-10 opacity-90">
        <img className='h-screen object-cover w-screen' src={BACKGROUD_IMAGE} alt="bgImage" />
      </div>
      <div>
        <GPTSearchBar/>
        <GPTSuggessionMovies/>
      </div>
    </div>
  );
};

export default GPTSearchPage;
