import Image from 'next/image'
import React from 'react'

function PinImage({PinDetail}) {

  return (
    <div>
      <Image src={PinDetail.image}
      alt={PinDetail.title}
      width={1000}
      height={1000}
    
      className='rounded-2xl'
      />

    </div>
  )
}

export default PinImage