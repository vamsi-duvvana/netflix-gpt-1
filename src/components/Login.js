import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { BG_IMG } from "../utils/constants"

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
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
            }).catch((error) => {
              setErrorMessage(error.Message);
            });
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
        <img className="" src={BG_IMG} alt="bg-img" />
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
