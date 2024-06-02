import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VeryfyEmail from './pages/VeryfyEmail';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SubCategories from './pages/SubCategories';
import SingleProduct from './pages/SingleProduct';
import Profile from './pages/Profile';
import ProfileInfo from './components/core/profile/ProfileInfo';
import Address from './components/core/profile/Address';

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
        <Route path='/shouse/:productId' element={<SingleProduct/>} />

        <Route  element={<Profile/>} > 
      <Route path={"my-profile/view-profile"} element={<ProfileInfo/>} />
      <Route path={"my-profile/add-address"} element={<Address/>} />
      </Route>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
