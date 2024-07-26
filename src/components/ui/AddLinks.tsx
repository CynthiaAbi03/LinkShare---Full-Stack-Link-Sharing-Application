'use client';
import React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LinkIcon from '../common/LinkIcon';
import path from 'path';
import { Link } from 'react-router-dom';


const AddLinks = () => {

  const [activeInput, setActiveInput] = useState<string | null>(null);

  const handleFocus = (name: string) => {
    setActiveInput(name);
  };

  const handleBlur = () => {
    setActiveInput(null);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        borderRadius: '8px',
        border: '1px solid hsl(var(--border))',
        boxShadow: '0px 0px 32px 0px hsla(0,0%,0%.0.1)',
      },
    },
  };

  type LinkTable = {
    platform: string;
    url: string;
  };

  type Option = {
    src: string;
    alt: string;
    value: string;
  };

  const options = [
    {
      src: '/svg/github.svg',
      alt: '"github icon"',
      value: 'Github',
    },
    {
      src: '/svg/frontendMentor.svg',
      alt: 'frontend mentor icon',
      value: 'Frontend Mentor',
    },
    {
      src: '/svg/twitter.svg',
      alt: 'twitter icon',
      value: 'Twitter',
    },
    {
      src: '/svg/linkedin.svg',
      alt: 'linkedin icon',
      value: 'LinkedIn',
    },
    {
      src: '/svg/youtube.svg',
      alt: 'youtube icon',
      value: 'Youtube',
    },
    {
      src: '/svg/facebook.svg',
      alt: 'facebook icon',
      value: 'Facebook',
    },
    {
      src: '/svg/twitch.svg',
      alt: 'twitch icon',
      value: 'Twitch',
    },
    {
      src: '/svg/dev.svg',
      alt: 'dev to icon',
      value: 'Dev.to',
    },
    {
      src: '/svg/codewars.svg',
      alt: 'codewars icon',
      value: 'Codewars',
    },
    {
      src: '/svg/codepen.svg',
      alt: 'code pen icon',

      value: 'Codepen',
    },
    {
      src: '/svg/freecodecamp.svg',
      alt: 'free code camp icon',
      value: 'freeCodeCamp',
    },
    {
      src: '/svg/gitlab.svg',
      alt: 'gitlab icon',
      value: 'GitLab',
    },
    {
      src: '/svg/hashnode.svg',
      alt: 'hashnode icon',

      value: 'Hashnode',
    },
    {
      src: '/svg/stackoverflow.svg',
      alt: 'stack overflow icon',

      value: 'Stack Overflow',
    },
  ];

  const [linksTableValue, setLinksTableValue] = useState<LinkTable[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Option | null>(null);
  const [url, setUrl] = useState<string>('');

  const handlePlatformChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    setSelectedPlatform(selectedOption || null);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const addNewLink = () => {
    if (selectedPlatform && url) {
      setLinksTableValue((prev) => [
        ...prev,
        {
          platform: selectedPlatform.value,
          url,
        },
      ]);
      setSelectedPlatform(null);
      setUrl('');
    }
  };

  const removeLink = (index: number) => {
    setLinksTableValue((prev) => {
      const newLinks = [...prev];
      newLinks.splice(index, 1);
      return newLinks;
    });
  };

  return (
    <div className="h-[100%] w-full overflow-y-auto">
      <div className="bg-lightGrey flex flex-col gap-3 rounded-[12px] p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/svg/rectangle.svg"
              alt="hamburger-icon"
              width={12}
              height={6}
            />
            <p className="text-themeGrey font-bold text-md leading-150">
              Link #1
            </p>
          </div>
          <p className="text-themeGrey leading-150 text-md cursor-pointer hover:font-semibold transition">
            Remove
          </p>
        </div>

        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label
              className="font-regular text-md text-darkGrey leading-150"
              htmlFor="Platform"
            >
              Platform
            </label>
            <Select
              sx={{
                backgroundColor: 'white',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  padding: '12px 16px',
                  outline: 'none',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover': {},
                '&.Mui-focused': {
                  boxShadow: '0px 0px 32px 0px hsla(var(--activeShadow))',
                  border: '1px solid hsla(var(--activeShadow))',
                },
                '& .MuiSelect-icon': {},
              }}
              value={selectedPlatform?.value || ''}
              onChange={handlePlatformChange}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected: string) => {
                if (!selected) {
                  return (
                    <div className="flex items-center gap-2">
                      <Image
                        src="/svg/github.svg"
                        width={16}
                        height={16}
                        alt="Github Icon"
                      />
                      <p>Github</p>
                    </div>
                  );
                }
                const option = options.find(
                  (option) => option.value === selected
                );
                return option ? (
                  <div className="flex items-center gap-2">
                    <Image
                      src={option?.src || ''}
                      width={16}
                      height={16}
                      alt={option?.alt || ''}
                    />
                    <p>{option.value}</p>
                  </div>
                ) : (
                  <em>Placeholder</em>
                );
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {options.map((item, index) => (
                <MenuItem
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    padding: '0px 12px',
                    backgroundColor: 'white',
                    '&:hover': {
                      backgroundColor: 'white', // Remove hover effect
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'white', // Keep background color consistent for selected item
                    },
                  }}
                  key={index}
                  value={item.value}
                >
                  <div className="flex items-center gap-2 w-full py-3 border-b border-border">
                    <Image
                      src={item?.src || ''}
                      width={16}
                      height={16}
                      alt={item?.alt || ''}
                    />
                    <p className="font-regular text-darkGrey text-md">
                      {item.value}
                    </p>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2 ">
            <label
              className="font-regular text-md text-darkGrey leading-150"
              htmlFor="link"
            >
              Link
            </label>
            <div
              className={`flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${activeInput === 'link' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'} `}
            >
              <LinkIcon className="fill-themeGrey focus:shadow-activeShadow" />
              <input
                type="link"
                name="link"
                id="link"
                placeholder="Enter your link"
                onChange={handleUrlChange}
                onFocus={() => handleFocus('link')}
                onBlur={handleBlur}
                className="w-full placeholder:text-md placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLinks;
