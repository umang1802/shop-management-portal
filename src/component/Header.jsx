import React from 'react'

function Header(props) {
  return (
    <div>
       <div className='font-semibold text-left ml-8 text-2xl'>{props.heading}</div>
       {/* <span className='float-right'>Notification Icon</span> */}
    </div>
  )
}

export default Header
