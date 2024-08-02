import React from 'react'
import Image from 'next/image'

const GettingStarted = () => {
  return (
    <div className="h-[100%] bg-lightGrey p-8 max-sm:p-8">
    <div className=" flex flex-col h-[full] gap-10 justify-center  items-center p-10 max-sm:p-0">
      <div className='max-sm:hidden'>
        <Image
          src="/images/image1.png"
          alt=""
          width={250}
          height={160}
        />
      </div>
      <div className='max-sm:block hidden'>
        <Image
          src="/images/image1.png"
          alt=""
          width={125}
          height={800}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 w-1/2 max-sm:w-full">
        <p className="font-bold text-darkGrey text-lg max-sm:text-[24px]">
          Let&apos;s get you started
        </p>
        <p className="text-themeGrey font-regular text-center leading-150 text-md">
          Use the “Add new link” button to get started. Once you have
          more than one link, you can reorder and edit them. We’re
          here to help you share your profiles with everyone!
        </p>
      </div>
    </div>
  </div>
  )
}

export default GettingStarted