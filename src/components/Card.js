import React from 'react'

const Card = ({ children, className = '' }) => {
  return (
    <div className={`border shadow rounded p-4 ${className}`}>
      {children}
    </div>
  )
}

export default Card
