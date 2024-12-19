import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between pl-5 pt-5 pr-5'>
        <h1 className='font-semibold'>Hello!<br/> <span className='text-2xl font-semibold'>Gourav👋</span></h1>
        <button className='border-2 p-2 rounded bg-red-700 font-semibold active:scale-95'>Log Out</button>
    </div>
  )
}

export default Header
