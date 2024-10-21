import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return  <div className='flex pb-2 justify-center items-center border-b border-gray-500'>
    <Link to={"/"}>
    <img src='https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png' className='w-24 rounded-full' />
    </Link>
    <h1 className='text-2xl px-2 first-letter:text-5xl'>Github Users</h1>
  </div>
}

export default Logo