import React, { useRef, useState } from 'react';
import Header from './Header';
import { loginValidation, signUpValidation } from '../utils/LoginValidation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BACKGROUD_IMAGE, USER_AVATAR } from '../utils/constants';

// 🚀 Global signup progress ref (important)
export const signupInProgress = { current: false };

const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMsg, seterrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // To show loading state

  // Image State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    USER_AVATAR
  ); // Default avatar

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

  const handleToggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
    seterrorMsg(null);
    // Reset image on toggle
    setImageFile(null);
    setImagePreview(
      USER_AVATAR
    );
  };

  // 1. Trigger the hidden file input when the circle is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 2. Handle file selection and generate a local preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create local URL for preview
    }
  };

  // Function to Upload to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error('Cloudinary upload failed');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignInForm) {
      let msg = loginValidation(email.current.value, password.current.value);
      if (msg) {
        seterrorMsg(msg);
        setIsLoading(false);
        return;
      }

      if (msg == null) {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {})
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterrorMsg(errorCode + ' -> ' + errorMessage);
          })
          .finally(() => setIsLoading(false));
      }
    } else {
      let msg = signUpValidation(
        name.current.value,
        email.current.value,
        password.current.value
      );
      if (msg) {
        seterrorMsg(msg);
        setIsLoading(false);
        return;
      }

      if (msg == null) {
        try {
                signupInProgress.current = true; // 🔥 Prevent onAuthStateChanged overwriting redux

                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );

                const user = userCredential.user;

                let publicImageUrl = USER_AVATAR;

                // Upload only if selected
                if (imageFile) {
                    const uploadedUrl = await uploadToCloudinary(imageFile);
                    if (uploadedUrl) publicImageUrl = uploadedUrl;
                }

                await updateProfile(user, {
                    displayName: name.current.value,
                    photoURL: publicImageUrl,
                });

                await auth.currentUser.reload();

                const { uid, email: userEmail, displayName, photoURL } = auth.currentUser;

                dispatch(
                    addUser({
                    uid,
                    email: userEmail,
                    displayName,
                    photoURL,
                    })
                );
                navigate("/browse");
                } catch (error) {
                seterrorMsg(error.code + ' -> ' + error.message);
                } finally {
                signupInProgress.current = false; // allow onAuth listener again
                setIsLoading(false);
                }
            };
      }
    }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BACKGROUD_IMAGE}
          alt="bgImage"
        />
      </div>
      <div className="absolute w-3/12 p-10 bg-black mt-52 mx-auto right-0 left-0 text-white bg-opacity-70 rounded-xl">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="font-bold text-3xl pb-10">
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </h1>
          {!isSignInForm && (
            <>
              {/* --- CLICKABLE IMAGE UPLOAD SECTION --- */}
              <div className="flex justify-center mb-6">
                <div
                  className="relative w-24 h-24 cursor-pointer group"
                  onClick={handleImageClick}
                  title="Click to upload image"
                >
                  {/* The Image Circle */}
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover border-2 border-red-600 group-hover:opacity-70 transition-opacity"
                  />

                  {/* Overlay Text on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold bg-black bg-opacity-50 px-2 py-1 rounded">
                      Upload
                    </span>
                  </div>
                </div>

                {/* Hidden Input File */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <input
                type="text"
                ref={name}
                className="rounded w-full p-4 bg-gray-800 mb-5 text-white"
                placeholder="Full Name"
              />
            </>
          )}
          <input
            type="text"
            ref={email}
            className="rounded w-full p-4 bg-gray-800 mb-5"
            placeholder="Enter email"
          />
          <input
            type="password"
            ref={password}
            className="rounded w-full p-4 bg-gray-800 mb-5"
            placeholder="Enter password"
          />
          <h3 className="text-red-700 font-bold">{errorMsg}</h3>
          <button
            disabled={isLoading}
            className="bg-red-700 rounded-lg w-full text-xl py-3 my-5 font-bold hover:bg-red-800 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : isSignInForm ? 'Sign In' : 'Sign Up'}
          </button>
          <p className="py-3 cursor-pointer" onClick={handleToggleSignInForm}>
            {isSignInForm
              ? 'New to Netflix? Sign Up Now.'
              : 'Already registered? Sign In.'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
