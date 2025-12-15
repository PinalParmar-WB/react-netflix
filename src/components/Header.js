import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';

import { signupInProgress } from './Login';
import { LOGO, PREFERRED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);

  const showGPT = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (signupInProgress.current) return;

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, photoURL, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate('/browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const hangleChangeLanguage = (e) => {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-5 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center flex-col md:flex-row">
      <img className="w-32 md:w-60" src={LOGO} alt="logo" />
      {user && (
        <div className="flex items-center">
          {showGPT && (
            <div>
              <select
                onChange={(e) => hangleChangeLanguage(e)}
                className="bg-gray-900 text-white py-2 px-2 mr-4 border border-white rounded-lg"
              >
                {PREFERRED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div
            className="bg-purple-800 text-white px-4 py-2 rounded-lg font-bold mr-4 cursor-pointer text-sm md:text-lg"
            onClick={handleGptSearch}
          >
            {showGPT ? "Home Page" : "GPT Search"}
          </div>
          <div className='hidden md:block'>
            <img
              src={user.photoURL}
              className="w-12 h-12 rounded-xl"
              alt="profile"
            ></img>
          </div>
          <h3
            className="mx-4 bg-red-600 px-4 py-2 rounded-lg text-white font-bold text-sm md:text-xl cursor-pointer"
            onClick={handleSignOut}
          >
            Logout
          </h3>
        </div>
      )}
    </div>
  );
};

export default Header;
