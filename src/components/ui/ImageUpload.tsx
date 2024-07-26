'use client';
import React, { useState } from 'react';
// import Image from 'next/image';

import NextImage from 'next/image';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
        setError('Only PNG or JPG formats are allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          if (img.width > 1024 || img.height > 1024) {
            setError('Image must be below 1024x1024px.');
            return;
          }
          setImage(event.target?.result as string);
          setError(null);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[60%] flex flex-col gap-3">
      <div className="flex items-center gap-6">
        <div
          className={`w-[50%] h-[193px]  rounded-[12px] flex flex-col items-center justify-center object-fill object-center relative`}
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundColor: !image ? 'rgba(239, 235, 255, 1)' : 'transparent',
          }}
        >
          {!image ? (
            <>
          
              <NextImage
                width={40}
                height={40}
                alt="upload image"
                src="/svg/uploadimg.svg"
              />
              <label
                htmlFor="image-upload"
                className="text-purplePrimary cursor-pointer font-semibold leading-150 text-base"
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="hidden"
                />
                + Upload Image
              </label>
            </>
          ) : (
            <>
              <div className='bg-black absolute opacity-50 right-6 top-6 rounded-[12px]'></div>
              <NextImage
                width={40}
                height={40}
                alt="upload image"
                src="/svg/uploadimagewhite.svg"
              />
              <label
                htmlFor="image-upload"
                className="text-white cursor-pointer font-semibold leading-150 text-base"
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="hidden"
                />
                Change Image
              </label>
            </>
          )}
        </div>
        <p className="text-themeGrey text-[14px] leading-150">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
      {error && <p className="text-redTheme text-base font-medium">{error}</p>}
    </div>
  );
};

export default ImageUpload;
