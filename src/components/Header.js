import { useNavigate } from "react-router-dom"
import { removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOutBtn = () => {
        signOut(auth).then(() => {
            dispatch(removeUser());
            navigate("/");
        }).catch((error) => {
            navigate("/error");
        });
    }

    return (
        <div className="absolute px-5 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
            <img className="w-52" src="https://res.cloudinary.com/dhqgc5kzm/image/upload/v1705491730/netflix-logo_wss2p8.png" alt="logo" />

            {user && (<div className="flex my-10 p-2">
                <div className="mr-2 mt-2 text-white">Hi, {user.displayName}</div>
                <img className="w-10 h-10 mr-2" src="https://occ-0-2186-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e" alt="profile-img" />
                <button onClick={() => handleSignOutBtn()} className="mt-1 text-white text-sm">(Sign Out)</button>
            </div>)}
        </div>
    )
}

export default Header
