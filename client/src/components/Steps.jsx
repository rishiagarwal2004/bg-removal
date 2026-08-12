//creation of Steps
import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 x1:py-40'>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 pb-2 leading-relaxed font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Steps to remove background <br /> images in seconds</h1>
      <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>
        <div className='flex items-start gap-5 bg-white border border-gray-200 rounded-2xl p-7 shadow-lg rounded hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
            <img className='max-w-9'src={assets.upload_icon}alt="" />
            <div>
              <p className='text-xl font-medium'>Upload Image</p>
              <p className='text-sm text-neutral-500 mt-1'>This is a demo text, will replace it later.<br />This is a demo...</p>
            </div>
        </div>
        <div className='flex items-start gap-5 bg-white border border-gray-200 rounded-2xl p-7 shadow-lg rounded hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
            <img className='max-w-9'src={assets.remove_bg_icon}alt="" />
            <div>
            <p className='text-xl font-medium'>Remove Background</p>
            <p className='text-sm text-neutral-500 mt-1'>This is a demo text, will replace it later.<br />This is a demo...</p>
            </div>
        </div>
          <div className='flex items-start gap-5 bg-white border border-gray-200 rounded-2xl p-7 shadow-lg rounded hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
            <img className='max-w-9'src={assets.download_icon}alt="" />
            <div>
              <p className='text-xl font-medium'>Download Image</p>
              <p className='text-sm text-neutral-500 mt-1'>This is a demo text, will replace it later.<br />This is a demo...</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Steps
