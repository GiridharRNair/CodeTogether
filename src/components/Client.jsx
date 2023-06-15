import React from 'react'
import Avatar from 'react-avatar';

function Client({ username = '', color = ''}) {


  return (
    <div className='space-x-1 text-stone-500'>
        <Avatar name={username} size={50} round='14px' color={color}/>
        <span>{username}</span>
    </div>
  )
}

export default Client