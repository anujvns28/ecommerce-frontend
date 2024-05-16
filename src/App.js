import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VeryfyEmail from './pages/VeryfyEmail';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <div className='text-blacks'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/verify-email' element={<VeryfyEmail/>}/>
      </Routes>
    </div>
  );
}

export default App;
