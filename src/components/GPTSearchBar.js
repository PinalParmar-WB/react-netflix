import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { languages } from '../utils/languageConstants';
import openai from '../utils/openai';
import { API_OPTIONS} from '../utils/constants';
import { addGptMovies } from '../utils/gptSlice';

const GPTSearchBar = () => {
  const language = useSelector((store) => store.config.lang);
  const searchInput = useRef();
  const dispatch = useDispatch();

  const tmdbMovieSearch = async (movie) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS);
    const json = await data.json();
    return json.results;
  }

  const handleSearch = async () => {
    const gptQuery =
      'Act as a movie recommendation system and suggest some movies for the query : ' +
      searchInput.current.value +
      '. Only give me name of 5 movies, comma seperated like the example result given ahead. Example Result : Golmal, Dhamal, Ready, Hera Pheri, Padosan';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: gptQuery },
      ],
    });

    console.log(completion.choices?.[0]?.message?.content);

    const movieNamesArray = completion.choices?.[0]?.message?.content.split(", ");

    const promiseArray = movieNamesArray.map(movie => tmdbMovieSearch(movie));

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(addGptMovies({names : movieNamesArray, movies: tmdbResults}));
  };
  return (
    <div className="pt-[55%] md:pt-[10%] flex justify-center">
      <form
        onClick={(e) => e.preventDefault()}
        className="bg-black w-full m-4 md:w-1/2 grid grid-cols-12"
      >
        <input
          type="text"
          ref={searchInput}
          className="p-4 m-4 md:col-span-9 col-span-8"
          placeholder={languages[language].searchPlaceHolder}
        />
        <button
          onClick={handleSearch}
          className="bg-red-700 m-4 text-white rounded-lg px-4  py-2 col-span-4 md:col-span-3"
        >
          {languages[language].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
