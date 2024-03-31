/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Chat from "./commponents/Chat"
import Summary from "./commponents/Summary";
import { TbWorldSearch } from "react-icons/tb";



const App = () => {
  const [token, setToken] = useState("");
  const [googleSearch,setGoogleSearch] = useState(false);
  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const yuoutubeUrl = tabs[0].url;
      setToken(yuoutubeUrl.split("v=")[1]);
    });
  })
  return (
    <div className='relative min-w-96 p-4 bg-gray-900'>
      <TbWorldSearch className={`${googleSearch ? "text-white hover:text-gray-400" : "text-gray-400 hover:text-white"} text-3xl hover:text-white cursor-pointer fixed top-4 bg-gray-800 rounded-lg`} onClick={() => setGoogleSearch(!googleSearch)}/>
      <Summary token={token}/>
      <Chat token={token} googleSearch={googleSearch}/>
    </div>
  )
}


// O0fIhFNBgTI

export default App
