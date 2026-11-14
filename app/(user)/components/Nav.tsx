import Link from 'next/link'
import React from 'react'

function Nav() {
  return (
    <nav className='h-full w-fit flex items-center text-sm'>
        <Link href='#'>المبادرات</Link>
    </nav>
  )
}

export default Nav