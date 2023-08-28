import React from 'react'
import UserTag from '../UserTag'

function PinInfo({PinDetail}) {
  const user={
    name:PinDetail.userName,
    email:PinDetail.email,
    image:PinDetail.userImage
  }
  return (
    <div>
      <h2 className='text-[30px] font-bold mb-10'>{PinDetail.title}</h2>
      <UserTag user={user} />
      <h2 className='mt-10'>{PinDetail.desc}</h2>
      <button className='p-2 bg-[#e9e9e9] px-5 text-[23px]
      mt-10 rounded-full hover:scale-105 transition-all'
      onClick={()=>window.open(PinDetail.link)}>Open Url</button>
    </div>
  )
}

export default PinInfo