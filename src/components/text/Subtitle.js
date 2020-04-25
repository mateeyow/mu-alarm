import React from 'react'

const Subtitle = ({ children, className = '' }) => {
  return (
    <h2 className={`text-l font-semibold text-gray-500 ${className}`}>
      {children}
    </h2>
  )
}

export default Subtitle
