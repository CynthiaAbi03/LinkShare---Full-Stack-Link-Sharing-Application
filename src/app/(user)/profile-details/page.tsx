'use client';
import ImageUpload from '@/components/ui/ImageUpload';
import PhonePreview from '@/components/ui/PhonePreview';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  profileDetailsSchema,
  TProfileDetailsSchema,
} from '../../../models/types';
import Loader from '@/components/common/Loader';
import NextImage from 'next/image';
import { useAuth } from '@/context/AuthContext';

const ProfileDetails = () => {
  const { userData } = useAuth();
  const id = userData?.id;
  const [serverError, setServerError] = useState([]);
  const [image, setImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    getValues,
  } = useForm<TProfileDetailsSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(profileDetailsSchema),
  });
  const profilePictureRegister = register('profilePicture', { required: true });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
        setError('profilePicture', {
          type: 'manual',
          message: 'Only PNG or JPG formats are allowed.',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          if (img.width > 1024 || img.height > 1024) {
            setError('profilePicture', {
              type: 'manual',
              message: 'Image must be below 1024x1024px.',
            });
            return;
          }
          setImage(event.target?.result as string);
          //setError(null);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: TProfileDetailsSchema) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      profilePicture: image,
      email: data.email,
    };
    try {
      const res = await fetch(`api/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await res.json();
      if (!res.ok) {
        if (responseData.error) {
          setServerError(responseData.error);
          console.log(responseData.error);
        }
      } else if (responseData.success && responseData.status === 200) {
        alert('saved successfully');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(userData, 'userData');
  }, []);

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-lightGrey items-center gap-6 p-5 rounded-[12px] flex  max-sm:flex-col justify-between">
                <p className="text-themeGrey leading-150 text-md w-[40%] max-sm:w-full">
                  Profile Picture
                </p>
                {/* Image upload */}
                <div className="w-[60%] flex flex-col gap-3 max-sm:w-full">
                  <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-start ">
                    <div
                      className={`w-[250px] h-[193px] max-sm:w-[193px] custom:w-[300px] rounded-[12px] flex flex-col items-center justify-center object-cover object-center relative`}
                      style={{
                        // backgroundImage: image ? `url(${image})` : 'none',
                        backgroundColor: !image
                          ? 'rgba(239, 235, 255, 1)'
                          : 'transparent',
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
                              // {...profilePictureRegister}
                              {...register('profilePicture', {
                                onChange: handleImageChange,
                              })}
                              id="image-upload"
                              type="file"
                              accept="image/png, image/jpeg"
                              // onChange={(e) => {
                              //   profilePictureRegister.onChange(e.target.files); // use react hook form method
                              //   //handleImageChange(e); // my custom method
                              //   setImage(e.target.files?.[0] || null);
                              // }}
                              className="hidden"
                            />
                            + Upload Image
                          </label>
                        </>
                      ) : (
                        <>
                          {/* <div className='bg-black absolute opacity-50 right-6 top-6 rounded-[12px]'></div> */}
                          <div className="h-full w-full">
                            <NextImage
                              width={193}
                              height={193}
                              alt="upload image"
                              src={image}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                          <label
                            htmlFor="image-upload"
                            className="text-white cursor-pointer font-semibold leading-150 text-base absolute top-[0] bg-black opacity-50 h-full flex flex-col justify-center items-center gap-2 rounded-[12px] w-full "
                          >
                            <NextImage
                              width={40}
                              height={40}
                              alt="upload image"
                              src="/svg/uploadimagewhite.svg"
                            />
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
                  {errors.profilePicture && (
                    <p className="text-redTheme text-base font-medium">
                      {errors.profilePicture.message}
                    </p>
                  )}
                </div>
              </div>
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
                  <div className="flex items-center justify-center gap-4">
                    {isSubmitting && <Loader />}
                    Save
                  </div>
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
