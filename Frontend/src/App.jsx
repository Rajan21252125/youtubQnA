/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Chat from "./commponents/Chat"
import Summary from "./commponents/Summary"

const App = () => {
  const [token, setToken] = useState("CXJo-XWBRPs");
  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const yuoutubeUrl = tabs[0].url;
      setToken(yuoutubeUrl.split("v=")[1]);
    });
  })
  return (
    <div className='relative min-w-96 p-4 bg-gray-900'>
      <Summary token={token}/>
      <Chat token={token}/>
    </div>
  )
}

export default App
