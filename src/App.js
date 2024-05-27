import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VeryfyEmail from './pages/VeryfyEmail';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SubCategories from './pages/SubCategories';

function App() {
  return (
    <div className='h-full w-full'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/verify-email' element={<VeryfyEmail/>}/>
        <Route path='/products/:categoryId/:subCategoryId' element={<SubCategories/>} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
