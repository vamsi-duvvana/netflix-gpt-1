import { useNavigate } from "react-router-dom"
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

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
        <div className="absolute px-5 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
            <img className="w-52" src={LOGO} alt="logo" />

            {user && (<div className="flex my-10 p-2">
                <div className="mr-2 mt-2 text-white">Hi, {user.displayName}</div>
                <img className="w-10 h-10 mr-2" src={USER_AVATAR} alt="profile-img" />
                <button onClick={() => handleSignOutBtn()} className="mt-1 text-white text-sm">(Sign Out)</button>
            </div>)}
        </div>
    )
}

export default Header
