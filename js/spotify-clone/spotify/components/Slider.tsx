import React, { useEffect, useState } from 'react'

interface Props {
    onChange: Function,
    value: string,
    className?: string
  
}
function Slider({ onChange, value, className}: Props) {

    
  return (
  <>
    <input 
    onChange={(e) => onChange(e.target.value)} 
    type="range" value={value} 
    className={`bg-gray-200 rounded-lg
     w-full md:w-1/2 h-2 appearance-none 
     cursor-pointer dark:bg-gray-700 ${className}`}
     />
    </>
    )
}

export default Slider