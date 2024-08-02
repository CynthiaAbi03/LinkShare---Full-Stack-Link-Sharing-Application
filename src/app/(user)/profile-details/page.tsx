import ImageUpload from '@/components/ui/ImageUpload';
import PhonePreview from '@/components/ui/PhonePreview';
import React from 'react';

const ProfileDetails = () => {
  return (
    <div className="body_container">
      <div className="flex gap-6 ">
        <PhonePreview />

        <div className="flex flex-col bg-white min-h-screen w-[60%] p-[40px] max-sm:p-[24px] gap-10 max-sm:w-[100%] custom:w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-darkGrey text-lg leading-150 max-sm:text-[24px]">
              Profile Details
            </p>
            <p className="text-themeGrey font-normal text-md">
              {' '}
              Add your details to create a personal touch to your profile
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-lightGrey items-center gap-6 p-5 rounded-[12px] flex  max-sm:flex-col justify-between">
              <p className="text-themeGrey leading-150 text-md w-[40%] max-sm:w-full">
                Profile Picture
              </p>
              <ImageUpload/>
            </div>
            <div className="bg-lightGrey p-5 rounded-[12px] flex flex-col gap-3">
              <div className="flex items-center">
                <label htmlFor="firstName" className="text-themeGrey w-[40%]">
                  First name*
                </label>
                <div className="w-[60%]">
                  <input
                    type="text"
                    name="firstName"
                    id=""
                    placeholder="e.g John"
                    className="bg-white py-3 px-4 w-full text-darkGrey rounded-lg border border-border outline-none focus:border-purplePrimary focus:shadow-activeShadow placeholder:text-themeGrey font-normal text-md"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label htmlFor="lastName" className="text-themeGrey w-[40%]">
                  Last name*
                </label>
                <div className="w-[60%]">
                  <input
                    type="text"
                    name="lastName"
                    id=""
                    placeholder="e.g Appleseed"
                    className="bg-white py-3 px-4 w-full text-darkGrey rounded-lg border border-border outline-none focus:border-purplePrimary focus:shadow-activeShadow placeholder:text-themeGrey font-normal text-md"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label htmlFor="email" className="text-themeGrey w-[40%]">
                  Email
                </label>
                <div className="w-[60%]">
                  <input
                    type="email"
                    placeholder="e.g email@example.com"
                    className="bg-white py-3 px-4 rounded-lg w-full text-darkGrey border outline-none focus:border-purplePrimary focus:shadow-activeShadow border-border placeholder:text-themeGrey font-normal text-md"
                  />
                </div>
              </div>
            </div>
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

export default ProfileDetails;
