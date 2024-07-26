import React from 'react'

const PhonePreview = () => {
  return (
    <div className="bg-white w-[40%] min-h-screen p-6 flex justify-center pt-[100px] ">

    <div className="relative mx-auto   border-themeGrey  border-[6px] rounded-[2.5rem] h-[640px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-white border border-themeGrey top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>

      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white flex flex-col justify-center mx-auto mt-6 gap-[56px] ">
        <div className=" gap-6 flex flex-col justify-center items-center">
          <div className="rounded-full h-24 w-24 bg-lightGrey2"></div>
          <div className="flex flex-col items-center justify-center gap-5 ">
            <div className="h-4 w-[160px] rounded-full bg-lightGrey2"></div>
            <div className="h-2 w-[72px] rounded-full bg-lightGrey2"></div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 overflow-y-auto">
          <div className="rounded-lg h-[44px] w-[237px] bg-lightGrey2"></div>
          <div className="rounded-lg h-[44px] w-[237px] bg-lightGrey2"></div>
          <div className="rounded-lg h-[44px] w-[237px] bg-lightGrey2"></div>
          <div className="rounded-lg h-[44px] w-[237px] bg-lightGrey2"></div>
          <div className="rounded-lg h-[44px] w-[237px] bg-lightGrey2"></div>
        </div>
      </div>
    </div>

  </div>

  )
}

export default PhonePreview