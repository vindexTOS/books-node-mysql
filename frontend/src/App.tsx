import { Route, Routes } from 'react-router-dom'
import NavBar from './components/navigation/NavBar'
import Login from './components/auth/login'
function App() {
  return (
    <>
      <NavBar />
      <Login />
      <Routes></Routes>
    </>
  )
}

export default App
