import React from 'react'
import { useSelector } from 'react-redux'


const Home = () => {
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);

  console.log(user,"user..")
  console.log(token,"token")
  return (
    <div className='absolute top-0'>
      
    </div>
  )
}

export default Home