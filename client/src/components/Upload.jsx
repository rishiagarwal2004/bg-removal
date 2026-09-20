import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Upload = () => {
  const { removeBg } = useContext(AppContext)
  return (
    <div className='pd-16'>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 pb-2 leading-relaxed font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent' >See The magic , Try Now </h1>
              <div className='text-center mb-24 mt-10'>
                <input onChange={(e => removeBg(e.target.files[0]))} type="file" accept='image/*' id="upload2" hidden />
      
                <label
                  htmlFor="upload2"
                  className="inline-flex items-center gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:scale-105 transition-all duration-300"
                >
                  <img src={assets.upload_btn_icon} width={20} alt="" />
                  <p className="text-sm">Upload your image</p>
                </label>
              </div>
    </div>
  )
}

export default Upload
