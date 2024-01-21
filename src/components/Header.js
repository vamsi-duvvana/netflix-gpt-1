import { useNavigate } from "react-router-dom"
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { addLanguageConfig } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const gptToggler = useSelector((store) => store.gpt.gptSearchToggle);

    const handleLangChange = (e) => {
        dispatch(addLanguageConfig(e.target.value));
    }

    const handleGptBtn = () => {
        if (gptToggler) {
            dispatch(toggleGptSearch(false));
        } else {
            dispatch(toggleGptSearch(true));
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        // Unsubscribe when component unmounts
        return () => unsubscribe();
    }, [])

    const handleSignOutBtn = () => {
        signOut(auth).then(() => {
            dispatch(removeUser());
        }).catch((error) => {
        });
    }

    return (
        <div className="absolute px-5 pt-2 bg-gradient-to-b from-black z-10 w-screen flex flex-col md:flex-row justify-between">
            <img className="w-52 mx-auto md:mx-0" src={LOGO} alt="logo" />
            {user && (<div className="flex my-0 md:my-10 p-2 justify-center items-center">
                {gptToggler && (<select className="p-2 m-2 rounded-md font-bold bg-gray-900 text-white" onChange={handleLangChange}>
                    {SUPPORTED_LANGUAGES.map((item) => {
                        return (
                            <option key={item.identifier} value={item.identifier}>{item.name}</option>
                        )
                    })}
                </select>)}
                <button className="p-2 m-2 mr-10 text-white bg-gray-500 rounded-md font-bold" onClick={() => handleGptBtn()} >{gptToggler ? "Home" : "GPT Search"}</button>
                <div className="mr-2 text-white">Hi, {user.displayName}</div>
                <img className="hidden md:inline-block w-10 h-10 mr-2" src={USER_AVATAR} alt="profile-img" />
                <button onClick={() => handleSignOutBtn()} className=" text-white text-sm">
                    <img className="w-7 md:w-8" src="https://res.cloudinary.com/dhqgc5kzm/image/upload/v1705844168/logout_e47vzq.png" alt="logout-icon"/>
                </button>
            </div>)}
        </div>
    )
}

export default Header
