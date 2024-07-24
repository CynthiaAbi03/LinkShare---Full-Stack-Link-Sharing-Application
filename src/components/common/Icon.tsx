import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IconProps {
  className?: string;
  iconPath: string;
  viewBox?: string;
}

const Icon = ({ className, iconPath, viewBox = '0 0 16 16' }: IconProps) => {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(className)}
    >
      <path d={iconPath} />
    </svg>
  );
};

export default Icon;
