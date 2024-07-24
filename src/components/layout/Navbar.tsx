'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Logo from './Logo';
import Link from 'next/link';

import ProfileIcon from '../common/ProfileIcon';
import LinkIcon from '../common/LinkIcon';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  return (
    <div className="header_container">
      <div className="bg-white flex py-4 pr-4 pl-6 justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/svg/devlinkLogo.svg"
            alt="devlinks logo"
            width={32}
            height={32}
          />
          <p className="font-bold text-lg text-darkGrey leading-150">
            devlinks
          </p>
        </div>

        <div className="flex gap items-center gap-2">
          <Link
            className={`${pathname === '/create-link' ? 'bg-lightPurple' : ''} flex items-center px-[27px] py-[11px] gap-2 rounded-lg transition`}
            href="/create-link"
            onMouseEnter={() => setHoveredLink('create-link')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <LinkIcon
              className={`${pathname === '/create-link' || hoveredLink === 'create-link' ? 'fill-purplePrimary' : 'fill-themeGrey'}   `}
            />
            <p
              className={`${pathname === '/create-link' || hoveredLink === 'create-link' ? 'text-purplePrimary' : 'text-themeGrey'} 
            }  font-semibold text-md leading-150`}
            >
              Links
            </p>
          </Link>

          <Link
            className={`${pathname === '/profile-details' ? 'bg-lightPurple' : ''} flex items-center px-[27px] py-[11px] gap-2 rounded-lg`}
            href="/profile-details"
            onMouseEnter={() => setHoveredLink('profile-details')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <ProfileIcon
              className={`${pathname === '/profile-details' || hoveredLink === 'profile-details' ? 'fill-purplePrimary' : 'fill-themeGrey'} hover:fill-purplePrimary`}
            />
            <p
              className={`${pathname === '/profile-details' || hoveredLink === 'profile-details' ? 'text-purplePrimary' : 'text-themeGrey'} font-semibold text-md leading-150 hover:text-purplePrimary transition`}
            >
              Profile Details
            </p>
          </Link>
        </div>

        <Link
          className="px-[27px] py-[11px] border border-purplePrimary text-purplePrimary rounded-lg  font-semibold text-md leading-150 my-auto hover:bg-lightPurple transition"
          href="/profile-preview"
        >
          Preview
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
