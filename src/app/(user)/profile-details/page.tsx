'use client';
import ImageUpload from '@/components/ui/ImageUpload';
import PhonePreview from '@/components/ui/PhonePreview';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { profileDetailsSchema, TProfileDetailsSchema } from '@/lib/types';
import Loader from '@/components/common/Loader';

const ProfileDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TProfileDetailsSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(profileDetailsSchema),
  });

  const onSubmit = async (data: TProfileDetailsSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    reset();
  };

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
              <ImageUpload />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-lightGrey p-5 rounded-[12px] flex flex-col gap-3 max-sm:mb-10">
                <div className="flex items-center max-sm:flex-col gap-3 max-sm:items-start ">
                  <label
                    htmlFor="firstName"
                    className="text-themeGrey w-[40%] max-sm:w-full"
                  >
                    First name*
                  </label>
                  <div className="w-[60%] max-sm:w-full flex flex-col gap-3">
                    <input
                      {...register('firstName')}
                      id=""
                      placeholder="e.g John"
                      className={`${errors.firstName && 'border-redTheme shadow-none'} bg-white py-3 px-4 w-full text-darkGrey rounded-lg border border-border outline-none focus:border-purplePrimary focus:shadow-activeShadow placeholder:text-themeGrey font-normal text-md`}
                    />
                    {errors.firstName && (
                      <p className="text-redTheme">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center max-sm:flex-col gap-3 max-sm:items-start ">
                  <label
                    htmlFor="lastName"
                    className="text-themeGrey w-[40%] max-sm:w-full"
                  >
                    Last name*
                  </label>
                  <div className="w-[60%] max-sm:w-full flex flex-col gap-3">
                    <input
                      {...register('lastName')}
                      id=""
                      placeholder="e.g Appleseed"
                      className={`${errors.lastName && 'border-redTheme shadow-none'} bg-white py-3 px-4 w-full text-darkGrey rounded-lg border border-border outline-none focus:border-purplePrimary focus:shadow-activeShadow placeholder:text-themeGrey font-normal text-md`}
                    />
                    {errors.lastName && (
                      <p className="text-redTheme">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center max-sm:flex-col gap-3 max-sm:items-start ">
                  <label
                    htmlFor="email"
                    className="text-themeGrey w-[40%] max-sm:w-full"
                  >
                    Email
                  </label>
                  <div className="w-[60%] max-sm:w-full flex flex-col gap-3">
                    <input
                      {...register('email')}
                      placeholder="e.g email@example.com"
                      className={` ${errors.email && 'border-redTheme shadow-none'} bg-white py-3 px-4 rounded-lg w-full text-darkGrey border outline-none focus:border-purplePrimary focus:shadow-activeShadow border-border placeholder:text-themeGrey font-normal text-md`}
                    />
                    {errors.email && (
                      <p className="text-redTheme">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex bg-white justify-end mx-6 max-sm:mx-6 max-sm:left-0 left-[40%] custom:left-0 custom:mx-10 py-6 px-10 border-t border-border max-sm:justify-normal max-sm:px-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white disabled:bg-purpleDisabled  px-[27px] py-[11px] bg-purplePrimary transition font-semibold rounded-lg max-sm:w-full"
                >
                  <p className="flex items-center justify-center gap-4">
                    {isSubmitting && <Loader />}
                    Save
                  </p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
