import React from 'react'

const Title = ({ children }) => {
  return (
    <h1 className='text-xl uppercase font-semibold text-gray-700 dark:text-white'>
      {children}
    </h1>
  )
}

export default Title
