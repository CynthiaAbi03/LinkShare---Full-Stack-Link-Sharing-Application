import React from 'react';
import Image from 'next/image';

const ProfilePreview = () => {
  return (
    <div className="absolute top-[250px] mx-auto left-1/2 tr">
      <div className="w-[349px] h-[569px] bg-white flex justify-center shadow-defaultShadow rounded-[24px] -translate-x-[50%]  gap-2 py-[48px]">
        <div className='flex flex-col gap-6 items-center'>
          <div className="h-[104px] w-[104px] ">
            <Image
              src="/images/me2.jpeg"
              alt="profile pic"
              width={0}
              height={0}
              className="w-full h-full rounded-full object-cover border-purplePrimary border-4"
            />
          </div>
          <p className='text-darkGrey font-bold text-lg leading-150'>Ben Wright</p>
          <p className='text-themeGrey '>abisseguecynthia@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
