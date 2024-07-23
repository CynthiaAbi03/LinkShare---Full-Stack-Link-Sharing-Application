import React from 'react';

import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/devlinkLogo.svg"
        alt="devlinks logo"
        width={40}
        height={40}
      />
      <p className="font-bold text-lg text-darkGrey">devlinks</p>
    </div>
  );
};

export default Logo;
