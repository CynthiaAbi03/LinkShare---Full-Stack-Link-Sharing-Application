import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ButtonProps {
  platform: string;
  url: string;
}

interface PlatformInfo {
  bgColor: string;
  icon: string;
}

interface PlatformData {
  [key: string]: PlatformInfo;
}

const platformData: PlatformData = {
  github: { bgColor: 'github', icon: '/svg/githubw.svg' },
  twitter: { bgColor: 'twitter', icon: '/svg/twitterw.svg' },
  frontendMentor: {
    bgColor: 'frontendMentor',
    icon: '/svg/frontendmentor2.svg',
  },
  linkedIn: { bgColor: 'linkedIn', icon: '/svg/linkedinw.svg' },
  youtube: { bgColor: 'youtube', icon: '/svg/youtubew.svg' },
  facebook: { bgColor: 'facebook', icon: '/svg/facebookw.svg' },
  twitch: { bgColor: 'twitch', icon: '/svg/twitchw.svg' },
  devto: { bgColor: 'devto', icon: '/svg/devtow.svg' },
  codewars: { bgColor: 'codewars', icon: '/svg/codewarsw.svg' },
  freeCodeCamp: {
    bgColor: 'freeCodeCamp',
    icon: '/svg/freecodecampw.svg',
  },
  gitlab: { bgColor: 'gitlab', icon: '/svg/gitlabw.svg' },
  hashnode: { bgColor: 'hashnode', icon: '/svg/hashnodew.svg' },
  stackoverflow: {
    bgColor: 'stackoverflow',

    icon: '/svg/stackoverflow2.svg',
  },
};
const Button = ({ platform, url }: ButtonProps) => {
  const platformInfo = platformData[platform];
  if (!platformInfo) {
    return null; // Return null if the platform is not supported
  }
  return (
    <Link href={url}>
      <a
        className={`p-2 rounded ${platformInfo.bgColor} text-white flex items-center`}
      >
        <Image src={platformInfo.icon} alt={platform} width={24} height={24} />
        <span className="ml-2">{platform}</span>
      </a>
    </Link>
  );
};

const SocialLinks: React.FC<{ links: ButtonProps[] }> = ({ links }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Button key={link.platform} platform={link.platform} url={link.url} />
      ))}
    </div>
  );
};

export default SocialLinks;
