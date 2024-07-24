'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import GettingStarted from '@/components/ui/GettingStarted';
import AddLinks from '@/components/ui/AddLinks';
const CreateLink = () => {
  const [addLinkVisible, setisAddLinkVisible] = useState(false);

  return (
    <div className="body_container">
      <div className="flex gap-6 ">
        <div className="bg-white w-[40%] min-h-screen p-6 flex justify-center pt-[100px] ">
          <div className="relative mx-auto   border-themeGrey  border-[6px] rounded-[2.5rem] h-[640px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-white border border-themeGrey top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>

            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white flex flex-col justify-center mx-auto mt-6 gap-[56px] ">
              {/* content */}

              <div className=" gap-6 flex flex-col justify-center items-center">
                <div className="rounded-full h-24 w-24 bg-lightGrey2"></div>
                <div className="flex flex-col items-center justify-center gap-5 ">
                  <div className="h-4 w-[160px] rounded-full bg-lightGrey2"></div>
                  <div className="h-2 w-[72px] rounded-full bg-lightGrey2"></div>
                </div>
              </div>

              {/* links display */}
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
        <div className="flex flex-col bg-white miin-h-screen w-[60%] p-[40px] gap-10">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-darkGrey text-lg">
              Customize your links
            </p>
            <p className="text-themeGrey font-regular text-md">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <button
              onClick={() => setisAddLinkVisible(true)}
              className="w-full py-[11px] px-[27px] border border-purplePrimary text-purplePrimary rounded-lg font-semibold leading-150 text-center hover:bg-lightPurple transition"
            >
              + Add new link
            </button>
            {addLinkVisible ? <AddLinks /> : <GettingStarted />}
          </div>
          <div className="flex justify-end py-6 px-10 border-t border-border ">
            <button className="text-white px-[27px] py-[11px] bg-purpleHover font-semibold rounded-lg">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
