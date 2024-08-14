'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GettingStarted from '@/components/ui/GettingStarted';
import AddLinks from '@/components/ui/AddLinks';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LinkIcon from '@/components/common/LinkIcon';
import path from 'path';
import { Link } from 'react-router-dom';
import PhonePreview from '@/components/ui/PhonePreview';
import { useAuth } from '@/context/AuthContext';


const CreateLink = () => {
  const {userData} = useAuth();
  const [addLinkVisible, setisAddLinkVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<number | null>(null);

  const handleFocus = (index: number) => {
    setActiveInput(index);
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

  // useEffect(() => {
  //   console.log(userData, 'authuserinfo');
  // }, [userData]);

  interface LinkTable {
    platform: string;
    url: string;
  }

  interface Option {
    src: string;
    alt: string;
    value: string;
  }

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

  const handleInputChange = (
    index: number,
    event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setLinksTableValue((prev) => {
      const newLinks = [...prev];
      if (name === 'platform') {
        newLinks[index].platform = value;
      } else if (name === 'url') {
        newLinks[index].url = value;
      }
      return newLinks;
    });
  };

  const addNewLink = () => {
    setLinksTableValue((prev) => [
      ...prev,
      {
        platform: 'Github',
        url: 'https://github.com/',
      },
    ]);
    setSelectedPlatform(null);
    setUrl('');
  };

  const removeLink = (index: number) => {
    setLinksTableValue((prev) => {
      const newLinks = [...prev];
      newLinks.splice(index, 1);
      return newLinks;
    });
  };

  useEffect(() => {
    if (linksTableValue.length === 0) {
      setisAddLinkVisible(false);
    } else {
      setisAddLinkVisible(true);
    }

    console.log(linksTableValue.length, 'linksTableValue length');
    //console.log('addLinkVisible:', addLinkVisible);
  }, [linksTableValue]);

  return (
    <div className="body_container">
      <div className="flex gap-6 max-sm:flex-col">
        <PhonePreview />
        <div className="flex flex-col bg-white w-[60%] min-h-screen p-[40px] gap-10 max-sm:w-[100%] custom:w-[100%] max-sm:p-[24px] ">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-darkGrey text-lg max-sm:text-[24px]">
              Customize your links
            </p>
            <p className="text-themeGrey font-regular text-md">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>

          <div className="flex max-h-screen flex-col gap-8">
            <button
              onClick={addNewLink}
              className="w-full  py-[11px] px-[27px] border border-purplePrimary text-purplePrimary rounded-lg font-semibold leading-150 text-center hover:bg-lightPurple transition"
            >
              + Add new link
            </button>

            {addLinkVisible ? (
              <div className="w-full gap-6 flex h-full mb-16 flex-col overflow-auto">
                {linksTableValue &&
                  linksTableValue.map((item, index) => (
                    <div
                      key={index}
                      className="bg-lightGrey flex flex-col gap-3 rounded-[12px] p-5"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/svg/rectangle.svg"
                            alt="hamburger-icon"
                            width={12}
                            height={6}
                          />
                          <p className="text-themeGrey font-bold text-md leading-150">
                            Link #{index + 1}
                          </p>
                        </div>
                        <button
                          onClick={() => removeLink(index)}
                          className="text-themeGrey leading-150 text-md cursor-pointer hover:font-semibold transition"
                        >
                          Remove
                        </button>
                      </div>

                      <form className="flex flex-col gap-3">
                        {/* platform input */}
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
                                boxShadow:
                                  '0px 0px 32px 0px hsla(var(--activeShadow))',
                                border: '1px solid hsla(var(--purplePrimary))',
                              },
                              '& .MuiSelect-icon': {},
                            }}
                            value={item.platform || ''}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            displayEmpty
                            name="platform"
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
                            {options.map((option, index) => (
                              <MenuItem
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 2,
                                  padding: '0px 12px',
                                  backgroundColor: 'white',
                                  '&:hover': {
                                    backgroundColor: 'white',
                                  },
                                  '&.Mui-selected': {
                                    backgroundColor: 'white',
                                  },
                                }}
                                key={index}
                                value={option.value}
                              >
                                <div className="flex items-center gap-2 w-full py-3 border-b border-border">
                                  <Image
                                    src={option?.src || ''}
                                    width={16}
                                    height={16}
                                    alt={option?.alt || ''}
                                  />
                                  <p className="font-regular text-darkGrey text-md">
                                    {option.value}
                                  </p>
                                </div>
                              </MenuItem>
                            ))}
                          </Select>
                        </div>

                        {/* Url input */}

                        <div className="flex flex-col gap-2 ">
                          <label
                            className="font-regular text-md text-darkGrey leading-150"
                            htmlFor="link"
                          >
                            Link
                          </label>
                          <div
                            className={`flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${
                              activeInput === index
                                ? 'border-purplePrimary shadow-activeShadow'
                                : 'border-border'
                            } `}
                          >
                            <LinkIcon className="fill-themeGrey focus:shadow-activeShadow" />
                            <input
                              type="url"
                              name="url"
                              id="url"
                              placeholder="Enter your link"
                              value={item.url}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              onFocus={() => handleFocus(index)}
                              onBlur={handleBlur}
                              className="w-full placeholder:text-md placeholder:font-regular placeholder:leading-150 placeholder:text-darkGrey outline-none"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  ))}
              </div>
            ) : (
              <GettingStarted />
            )}

            <div className="flex bg-white justify-end fixed bottom-0 z-50 mx-6 right-0 max-sm:mx-6 max-sm:left-0 left-[40%] custom:left-0 custom:mx-10 py-6 px-10 border-t border-border max-sm:justify-normal max-sm:px-0">
              <button className="text-white  px-[27px] py-[11px] bg-purpleHover font-semibold rounded-lg max-sm:w-full">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
