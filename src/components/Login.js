import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message);

    if (message === null) {
      if (isSignInForm) {
        // Sign In
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // const user = userCredential.user;
            navigate("/browse");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      } else {
        // Sign Up
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value
            }).then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
              navigate("/browse");
            }).catch((error) => {
              setErrorMessage(error.Message);
            });
            navigate("/browse")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    }
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="" src="https://assets.nflxext.com/ffe/siteui/vlv3/594f8025-139a-4a35-b58d-4ecf8fdc507c/d3c4e455-f0bf-4003-b7cd-511dda6da82a/IN-en-20240108-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="bg-img" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 flex flex-col bg-opacity-80">
        <h1 className="text-white mb-2 text-2xl font-semibold pl-2">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm &&
          (
            <input ref={name} type="text" placeholder="Full Name" className="p-2 px-5 m-2 text-white bg-gray-700 rounded-sm w-full text-sm" />
          )}
        <input ref={email} type="text" placeholder="Email Address" className="p-2 px-5 m-2 bg-gray-700 rounded-sm w-full text-sm text-white" />
        <input ref={password} type="password" placeholder="Password" className="p-2 px-5 m-2 bg-gray-700 rounded-sm w-full text-sm text-white" />
        <p className="text-amber-500 font-extralight text-xs p-2">{errorMessage}</p>
        <button className="px-2 py-1 m-2 bg-red-700 text-white font-semibold rounded-md w-full" onClick={() => handleButtonClick()}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <div className="mt-16 flex">
          <span className="text-gray-500 font-light text-sm ml-2 my-4">{isSignInForm ? "New to Netflix?" : "Already a user?"}</span>
          <p className=" text-white bg-transparent font-light text-sm mx-1 cursor-pointer my-4" onClick={() => toggleSignInForm()}>{isSignInForm ? "Sign up now" : "Sign in now"}</p>
        </div>
      </form>
    </div>
  )
}

export default Login
