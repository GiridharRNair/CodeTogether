import React, { memo } from 'react'
import Avatar from 'react-avatar';

const Client = memo(({ username = '', color = ''}) => {

  return (
    <div className='space-x-1 text-stone-500'>
        <Avatar name={username} size={50} round='14px' color={color}/>
        <span>{username}</span>
    </div>
  )
});

export default Client