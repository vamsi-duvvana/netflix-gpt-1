import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageContants"
import { useEffect } from "react";
import { addLanguageConfig } from "../utils/configSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

const GptSearchBar = () => {

    const dispatch = useDispatch();
    const language = useSelector(store => store.appConfig.lang);

    useEffect(() => {
        dispatch(addLanguageConfig(SUPPORTED_LANGUAGES[0].identifier))
    }, [])

    return (
        <div className="pt-[15%] flex justify-center">
            <form className="bg-black grid grid-cols-12 w-1/2 rounded-md" >
                <input type="text" className="col-span-10 px-4 py-2 m-4 rounded-md" placeholder={lang[language].gptSearchBarPlaceholder} />
                <button className="col-span-2 bg-red-700 text-white m-4 rounded-md" >{lang[language].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar
