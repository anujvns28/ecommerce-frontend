import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import HeroSlides from '../components/core/home/HeroSlides';
import Footer from '../components/common/Footer';
import { getAllCategories } from '../service/operation/category';


const Home = () => {
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);

  const fetchAllCategory = async() => {
    const result = await getAllCategories();
    if(result){
      console.log(result)
    }
  }

  useEffect(() => {
    fetchAllCategory();
  },[])
  return (
    <div className='pt-3'>
      <HeroSlides/>

     
    </div>
  )
}

export default Home
