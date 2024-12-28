import React from 'react'
import { Link } from 'react-router-dom'

const RatingBreadCrumb = () => {
  return (
    <nav className='mb-4'>
    <ol className='flex items-center space-x-2'>
      <li>
        <Link to='/' className='text-red-500 hover:text-red-700'>
          Home
        </Link>
      </li>
      <li>
        <span className='text-gray-500'>/</span>
      </li>
      <li>
        <span className='text-red-500'>Rating</span>
      </li>
    </ol>
  </nav>
  )
}

export default RatingBreadCrumb