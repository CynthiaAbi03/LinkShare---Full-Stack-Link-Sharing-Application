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
  GITHUB: { bgColor: 'bg-github', icon: '/svg/githubw.svg' },
  TWITTER: { bgColor: 'bg-twitter', icon: '/svg/twitterw.svg' },
  FRONTENDMENTOR: {
    bgColor: 'frontendMentor',
    icon: '/svg/frontendmentor2.svg',
  },
  LINKEDIN: { bgColor: 'bg-linkedIn', icon: '/svg/linkedinw.svg' },
  YOUTUBE: { bgColor: 'bg-youtube', icon: '/svg/youtubew.svg' },
  FACEBOOK: { bgColor: 'bg-facebook', icon: '/svg/facebookw.svg' },
  TWITCH: { bgColor: 'bg-twitch', icon: '/svg/twitchw.svg' },
  DEVTO: { bgColor: 'bg-devto', icon: '/svg/devtow.svg' },
  CODEWARS: { bgColor: 'bg-codewars', icon: '/svg/codewarsw.svg' },
  FREECODECAMP: {
    bgColor: 'bg-freeCodeCamp',
    icon: '/svg/freecodecampw.svg',
  },
  GITLAB: { bgColor: 'bg-gitlab', icon: '/svg/gitlabw.svg' },
  HASHNODE: { bgColor: 'bg-hashnode', icon: '/svg/hashnodew.svg' },
  STACKOVERFLOW: {
    bgColor: 'bg-stackoverflow',
    icon: '/svg/stackoverflow2.svg',
  },
};
const Button = ({ platform, url }: ButtonProps) => {
  const platformInfo = platformData[platform.toUpperCase()];
  if (!platformInfo) {
    return null; // Return null if the platform is not supported
  }
  return (
    <Link href={url} legacyBehavior>
      <a
        target="_blank"
        className={` ${platformInfo.bgColor} text-white flex p-4 rounded-lg justify-between items-center`}
      >
        <div className="flex items-center gap-2">
          <Image
            src={platformInfo.icon}
            alt={platform}
            width={18}
            height={18}
          />
          <span className="ml-2">{platform}</span>
        </div>
        <Image
          src="/svg/arrow-right.svg"
          alt="arrow-icon"
          width={18}
          height={18}
        />
      </a>
    </Link>
  );
};

const SocialLinks: React.FC<{ links: ButtonProps[] }> = ({ links }) => {
  return (
    <div className="flex flex-col gap-4">
      {links.map((link) => (
        <Button key={link.platform} platform={link.platform} url={link.url} />
      ))}
    </div>
  );
};

export default SocialLinks;
