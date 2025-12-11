import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';

import { signupInProgress } from './Login'; 
import { LOGO } from '../utils/constants';


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(s => s.user);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (signupInProgress.current) return;

            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const {uid, email, photoURL, displayName} = user;
                dispatch(addUser({
                    uid: uid,
                    email : email,
                    displayName: displayName,
                    photoURL : photoURL
                }));
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='absolute w-full px-5 py-2 bg-gradient-to-b from-pink z-10 flex justify-between items-center'>
            <img className='w-60' src={LOGO}
            alt='logo' />
            {user && (
                <div className='flex items-center'>
                    <div><img src={user.photoURL} className='w-12 h-12 rounded-xl' alt='profile'></img></div>
                    <h3 className='mx-4 bg-red-600 px-4 py-2 rounded-lg text-white font-bold text-xl cursor-pointer' onClick={handleSignOut}>Logout</h3>
                </div>
            )}
            
        </div>
    )
}

export default Header