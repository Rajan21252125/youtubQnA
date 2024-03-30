/* eslint-disable react/prop-types */
import { useState } from "react";
import { summarize } from "../api";
import Loading from "./Loading";


const Summary = ({token}) => {
  const [summary , setSummary] = useState("");
  const [loading , setLoading ] = useState(false);


  const fetchSummarize = async (token,question) => {
    try {
      const response = await summarize(token,question);
      return response.data;
    } catch (error) {
      return error.response.statusText
    }
  }



  const handleClick = async () => {
    await getSummary();
  };
  
  const question = "Provide a short summary of this video"

  const getSummary = async () => {
    try {
      setLoading(true)
      const sum = await fetchSummarize(token,question)
      // const error = (sum.split(",")[0].split(":")[1])
      console.log(sum.status)
      setLoading(false)
      if (sum.status === false){
        return setSummary("Sorry, I could not summarize the video because the length of video is too long")
      }
      return setSummary(sum.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center text-white mt-6">
      <h1 className="text-base text-center font-semibold">
        Get your doubt solved without <br />
        watching a youtube video
      </h1>
      <button
        type="button"
        className="py-3 px-4 mt-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={handleClick}
        disabled={!token || summary ? 'disabled' : ''}
      >
        Summarize
      </button>
      <div className="mt-6">
      {loading ? <Loading /> : <p>{summary}</p>}
      {summary ? <p className="text-lg font-semibold mt-3 text-center">Start asking your doubt</p> : ""}
      </div>
    </div>
  );
};

export default Summary;
