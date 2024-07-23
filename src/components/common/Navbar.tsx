import React from 'react'
import Image from 'next/image'
import Logo from './Logo'
import Link from 'next/link'
import ProfileIcon from '../ui/ProfileIcon'

const Navbar = () => {
  return (
    <div className='header_container'>
        <div className='py-4 pl-6 pr-4 flex justify-between items-center'>
            <Logo/>
        </div>
        <div className='flex gap items-center'>
            <Link href="create-link">
                <ProfileIcon className='fill-black'/>
            </Link>
        </div>
    </div>
  )
}

export default Navbar