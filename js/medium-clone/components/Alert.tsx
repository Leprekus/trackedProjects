import React from 'react'

interface Props {
    severity: string, 
    children: any,
}
function Alert({severity, children}: Props) {

    let styling = 'font-semibold p-4 rounded-md ';
    switch (severity) {
        case 'success':
            styling = ''
            break;
        case 'alert':
          styling += 'bg-yellow-100 text-yellow-700'
        default:
            return styling
            
    }
  if(severity)
  return (
    <div className='font-semibold p-4 rounded-md bg-yellow-100 text-yellow-700'>{...children}</div>
  )
}

export default Alert