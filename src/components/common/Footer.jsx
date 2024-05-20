import React from 'react'
import {ImLinkedin} from "react-icons/im"
import {BsInstagram} from "react-icons/bs"
import {BsGithub} from "react-icons/bs"
import {BsTwitter} from "react-icons/bs"
import { Link } from 'react-router-dom'

const Footer = () => {
   
    return (
        <div className='w-full bg-black  text-white  pt-14'>
            <div className='flex justify-between w-full px-2 sm:px-20 '>
                <div className='flex w-full sm:w-[45%] justify-between'>
                    <div className='sm:text-xl text-sm font-semibold flex flex-col gap-2'>
                        <h1>FIND A  STORE</h1>
                        <h1>BECOME A MEMBER</h1>
                        <h1>Send Us Feedback</h1>
                        <h1>STUDENT DISCOUNT</h1>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h1 className='font-xl font-semibold'>GET HELP</h1>
                        <p className='text-xs text-gray-400 font-normal'>Order Status</p>
                        <p className='text-xs text-gray-400 font-normal'>Delivary</p>
                        <p className='text-xs text-gray-400 font-normal'>Returns</p>
                        <p className='text-xs text-gray-400 font-normal'>Payment Opetion</p>
                        <p className='text-xs text-gray-400 font-normal'>anujvns27@gmail.com</p>
                        <p className='text-xs text-gray-400 font-normal'>anujvns28@gmail.com</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h1 className='font-xl font-semibold'>ABOUT US</h1>
                        <p className='text-xs text-gray-400 font-normal'>News</p>
                        <p className='text-xs text-gray-400 font-normal'>Carreer</p>
                        <p className='text-xs text-gray-400 font-normal'>Investors</p>
                        <p className='text-xs text-gray-400 font-normal'>sustainability</p>
                    </div>
                </div>

                <div className='hidden sm:flex flex-row gap-3 text-xl'>
                 <Link> <ImLinkedin/></Link>
                 <Link> <BsGithub/></Link>
                 <Link> <BsTwitter/></Link>
                  <Link><BsInstagram/></Link>
                </div>
            </div>
            <div className='flex sm:flex-row flex-col gap-2 justify-between sm:px-20 px-5 pt-5 sm:pt-14 pb-2'>
                <div className='flex flex-row gap-2'>
                    <p className='text-xs font-normal'>India  </p>
                    <p className='text-xs text-gray-400 font-normal'>© 2023 Nike, Inc. All Rights Reserved</p>
                </div>

                <div className='flex flex-row gap-3'>
                    <p className='text-xs text-gray-400 font-normal'>Guides</p>
                    <p className='text-xs text-gray-400 font-normal'>Terms of Sale</p>
                    <p className='text-xs text-gray-400 font-normal'>Terms of Use</p>
                    <p className='text-xs text-gray-400 font-normal'>Nike Privacy Police</p>
                </div>

            </div>

        </div>
    )
}

export default Footer
