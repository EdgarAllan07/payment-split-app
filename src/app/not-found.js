import React from 'react'
import Link from 'next/link'

function NotFound() {
  return (
    <div className='container mx-auto'>
     <div className='flex flex-col justify-center items-center my-40'>
      <h1 className='font-bold text-3xl'> Page Not found</h1>
        <Link href="/" className='text-xl mt-4 hover:font-semibold hover:underline decoration-white '>Return</Link>
     </div>
    </div>
  )
}

export default NotFound
