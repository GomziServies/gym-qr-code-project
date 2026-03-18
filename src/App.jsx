import { Toaster } from 'react-hot-toast';
import './App.css'
import GymPage from './Component/Gympage';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <GymPage />
    </>
  )
}

export default App
