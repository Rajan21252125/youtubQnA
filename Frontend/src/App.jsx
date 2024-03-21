import Chat from "./commponents/Chat"
import Summary from "./commponents/Summary"

const App = () => {
  return (
    <div className='relative min-w-96 p-4 bg-gray-900'>
      <Summary />
      <Chat />
    </div>
  )
}

export default App
