// Navbar creation
import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const { openSignIn } = useClerk()

  const { isSignedIn, user } = useUser()

  const { credits, loadCreditsData } = useContext(AppContext)

  const navigate = useNavigate()

  useEffect(() => {

    if (isSignedIn) {
      loadCreditsData()
    }

  }, [isSignedIn])

  return (
    <div className='flex items-center justify-between mx-4 py-3 lg:mx-44'>

      <Link to='/'>
        <img
          className='w-32 sm:w-44'
          src={assets.logo}
          alt=''
        />
      </Link>

      {
        isSignedIn
          ?
<div className='flex items-center gap-2 sm:gap-4'>

  {/* Credits Button */}
  <button onClick={()=>navigate('/buy')}
    className='flex items-center gap-2 bg-white border border-blue-100 
    px-3 sm:px-5 py-2 sm:py-2.5 rounded-full 
    shadow-sm hover:shadow-md hover:scale-105 
    transition-all duration-300 cursor-pointer'
  >
    <img
      className='w-5 sm:w-6'
      src={assets.credit_icon}
      alt='credits'
    />

    <p className='text-xs sm:text-sm font-semibold text-gray-700'>
      Credits : <span className='text-blue-600'>{credits}</span>
    </p>
  </button>

  {/* Greeting */}
  <p className='text-gray-600 text-sm max-sm:hidden'>
    Hi, <span className='font-semibold text-gray-800'>{user.fullName}</span>
  </p>

  {/* Profile */}
  <div className='hover:scale-105 transition-transform duration-300'>
    <UserButton />
  </div>

</div>
          :
          <button
            onClick={() => openSignIn({})}
            className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full'
          >
            Get Started

            <img
              className='w-3 sm:w-4'
              src={assets.arrow_icon}
              alt=''
            />

          </button>
      }

    </div>
  )
}

export default Navbar