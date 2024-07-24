import React from 'react'
import Image from 'next/image'

const GettingStarted = () => {
  return (
    <div className="h-[100%] bg-lightGrey p-8">
    <div className=" flex flex-col h-[full] gap-10 justify-center items-center p-10">
      <div>
        <Image
          src="/images/image1.png"
          alt=""
          width={250}
          height={160}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 w-1/2">
        <p className="font-bold text-darkGrey text-lg">
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