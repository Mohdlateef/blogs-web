import React from 'react'

export default function Button({children}:any) {
  return (
    <div className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 active:bg-blue-700 transition-colors cursor-pointer">
    {children}
  </div>
  )
}
