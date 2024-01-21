import OpenAI from "openai";
import { OPENAI_API_KEY } from "./constants";

const openai = new OpenAI({
    apiKey: "test",
    dangerouslyAllowBrowser: true
})

export default openai;
