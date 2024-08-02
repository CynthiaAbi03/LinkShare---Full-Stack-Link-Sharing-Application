import React from 'react';
import Link from 'next/link';

const profilePreviewLayout = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen">
      <div className="bg-purplePrimary h-[357px] rounded-b-[32px]  px-6 py-6 max-sm:hidden">
        <div className="header_container2">
          <div className="flex items-center justify-between">
            <Link
              href="/create-link"
              className="text-purplePrimary border border-purplePrimary font-semibold rounded-lg py-[11px] px-[27px] hover:bg-lightPurple transition"
            >
              Back to Editor
            </Link>
            <Link
              href="/create-profile"
              className="text-white bg-purplePrimary font-semibold rounded-lg py-[11px] px-[27px] hover:bg-purpleHover transition"
            >
              Share Link
            </Link>
          </div>
        </div>
      </div>
      
      <div className="header_container2 hidden max-sm:block">
        <div className="flex items-center justify-between">
          <Link
            href="/create-link"
            className="text-purplePrimary border border-purplePrimary font-semibold rounded-lg py-[11px] px-[27px] max-sm:w-[160px] max-sm:px-0 max-sm:text-center hover:bg-lightPurple transition"
          >
            Back to Editor
          </Link>
          <Link
            href="/create-profile"
            className="text-white bg-purplePrimary font-semibold rounded-lg py-[11px] px-[27px] max-sm:w-[160px] max-sm:px-0 max-sm:text-center hover:bg-purpleHover transition"
          >
            Share Link
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
};

export default profilePreviewLayout;
