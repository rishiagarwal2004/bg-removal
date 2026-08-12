import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 px-4 lg:px-44 py-3'>
      <img  width={150} src= {assets.logo}alt="" />
            <p className=''>
        Copyright ©{" "}
        <a
          href="https://www.linkedin.com/in/rishi-agarwal-6067a4272/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rishi Agarwal
        </a>{" "}
        | All rights reserved.
      </p>
      <div className='flex gap-1'>
        <img width={40} src={assets.facebook_icon} alt="" />
        <img width={40} src={assets.twitter_icon} alt="" />
        <img width={40} src={assets.google_plus_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer
