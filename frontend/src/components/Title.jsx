import React from 'react'

function Title({text1}) {
    return (
       <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-blue-600'>{text1}</p>
       </div> 
    )
}

export default Title
