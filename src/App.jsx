import './assets/css/bootstrap.css'
import './assets/css/style.css'
import './assets/js/bootstrap'
import './assets/js/popper'
import CreateForm from './pages/CreateForm'
import DetailForm from './pages/DetailForm'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home /> } />
        <Route path='/create-form' element={<CreateForm />} />
        <Route path='/forms/:slug' element={<DetailForm />} />
      </Routes>
    </Router>
  )
}

export default App
