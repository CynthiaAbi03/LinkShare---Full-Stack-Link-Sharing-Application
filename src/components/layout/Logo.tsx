import React from 'react';

import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/svg/devlinkLogo.svg"
        alt="devlinks logo"
        width={40}
        height={40}
      />
      <p className="font-bold text-lg text-darkGrey leading-150">devlinks</p>
    </div>
  );
};

export default Logo;
