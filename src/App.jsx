import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Capsules from './components/Capsules';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Capsules />
    </>
  )
}

export default App
