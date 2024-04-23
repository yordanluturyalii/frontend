import './assets/css/bootstrap.css'
import './assets/css/style.css'
import './assets/js/bootstrap'
import './assets/js/popper'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom'

function App() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    redirect('/');
  } 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home /> } />
      </Routes>
    </Router>
  )
}

export default App
