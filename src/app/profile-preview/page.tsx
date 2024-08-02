import React from 'react';
import Image from 'next/image';
import SocialLinks from '@/components/common/Button';
import { platform } from 'os';

const ProfilePreview = () => {
  const links = [
    {
      platform: 'Github',
      url: 'https://github.com/',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com',
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com'
    },
    
    
  ];

  return (
    <>
    <div className="absolute top-[250px] mx-auto left-1/2 tr max-sm:static max-sm:top-auto max-sm:left-auto max-sm:justify-center max-sm:flex min-h-screen">
      <div className="w-[349px] h-[569px] max-sm:h-full bg-white max-sm:shadow-none max-sm:rounded-none max-sm:border-none flex flex-col max-sm:justify-center px-14 py-12 shadow-defaultShadow rounded-[24px] max-sm:transform-none -translate-x-[50%]  gap-14">
        <div className="flex flex-col gap-4 items-center max-sm:justify-center">
          <div className="h-[104px] w-[104px] ">
            <Image
              src="/images/me2.jpeg"
              alt="profile pic"
              width={104}
              height={104}
              className="w-full h-full rounded-full object-cover border-purplePrimary border-4"
            />
          </div>
        
        <div className='flex flex-col gap-2 items-center'>

          <p className="text-darkGrey font-bold text-lg leading-150 max-sm:text-[24px]">
            Ben Wright
          </p>
          <p className="text-themeGrey ">abisseguecynthia@gmail.com</p>
        </div>
        </div>
        <div className="overflow-y-auto">
            <SocialLinks links={links} />
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePreview;
