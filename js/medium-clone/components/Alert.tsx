import React from 'react'

interface Props {
    severity: string, 
    children: any,
}
function Alert({severity, children}: Props) {

  return (
    <div className='font-semibold p-4 rounded-md bg-yellow-100 text-yellow-700'>{...children}</div>
  )
}

export default Alert