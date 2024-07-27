import React from 'react';
import Link from 'next/link';

const profilePreviewLayout = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  return (
    <div className='min-h-screen'>
      <div className="bg-purplePrimary h-[357px] rounded-b-[32px]  px-6 py-6">
        <div className='header_container2'>
            <div className='flex items-center justify-between'>
                <Link href='/create-profile' className='text-purplePrimary border border-purplePrimary font-semibold rounded-lg py-[11px] px-[27px] hover:bg-lightPurple transition'>
                Back to Editor
                </Link>
                <Link href='/create-profile' className='text-white bg-purplePrimary font-semibold rounded-lg py-[11px] px-[27px] hover:bg-purpleHover transition'>
                Back to Editor
                </Link>
            </div>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default profilePreviewLayout;
