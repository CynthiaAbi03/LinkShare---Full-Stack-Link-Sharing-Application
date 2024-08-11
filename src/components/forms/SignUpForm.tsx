'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { signUpSchema, TSignUpSchema } from '../../models/types';
import Loader from '../common/Loader';

const SignUpForm = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [serverError, setServerError] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TSignUpSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(signUpSchema),
  });
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const handlePasswordVisibility = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };
  const handleFocus = (name: string) => {
    setActiveInput(name);
  };

  const handleBlur = () => {
    setActiveInput(null);
  };

  const onSubmit = async (data: TSignUpSchema) => {
    //await new Promise((resolve) => setTimeout(resolve, 10000));

    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      //console.log(data, 'response');

      if (!res.ok) {
        if (data.errors) {
          setServerError(data.errors);
        } else {
          setServerError(data.message);
        }
      } else if (res.status === 201) {
        //alert('Login successful');
        router.push('/create-link');
      }
    } catch (err) {
      console.log(err);
    }
    //reset();
  };
  useEffect(() => {
    console.log(serverError, 'serverError');
  }, [serverError]);

  // type Form = {
  //   email: string;
  //   password: string;
  //   confirmPassword: string;
  // };
  // const [form, setForm] = useState<Form>({
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };
  return (
    <div className="flex flex-col gap-10 p-[40px] bg-white w-[476px] max-sm:w-[80%] max-sm:p-0">
      <div className="flex flex-col gap-2">
        <p className="text-darkGrey font-bold text-lg leading-150 max-sm:text-2xl">
          Create account
        </p>
        <p className="text-themeGrey leading-150 text-md font-regular">
          Let&apos;s get you started sharing your links
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[1.5rem] max-sm:gap-4"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-regular text-md text-darkGrey leading-150"
          >
            Email Address
          </label>

          <div
            className={`w-full flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${errors.email && 'border-redTheme shadow-none'} ${activeInput === 'email' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image
              src="/svg/email.svg"
              alt="email icon"
              width={16}
              height={16}
            />
            <input
              {...register('email')}
              type="email"
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              placeholder="e.g alex@email.com"
              className=" w-full bg-white placeholder:text-md placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-redTheme">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-regular text-md text-darkGrey leading-150"
            >
              Password
            </label>

            {!errors?.password && (
              <p className="font-regular text-[14px] text-themeGrey leading-150">
                Password must contain at least 6 characters
              </p>
            )}
          </div>
          <div
            className={`w-full relative flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${errors.password && 'border-redTheme shadow-none'} ${activeInput === 'password' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image src="/svg/lock.svg" alt="lock icon" width={16} height={16} />
            <input
              type={passwordIsVisible ? 'text' : 'password'}
              id="password"
              {...register('password')}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              placeholder="Password"
              className=" w-full placeholder:text-md placeholder:font-regular placeholder:leading-150 placeholder:text-darkGrey bg-white outline-none"
            />
            {passwordIsVisible && (
              <div className="absolute right-2">
                <AiOutlineEye
                  color="#737373"
                  size={24}
                  onClick={handlePasswordVisibility}
                />
              </div>
            )}
            {!passwordIsVisible && (
              <div className="absolute right-2">
                <AiOutlineEyeInvisible
                  size={24}
                  color="#737373"
                  onClick={handlePasswordVisibility}
                />
              </div>
            )}
          </div>
          {errors.password && (
            <p className="text-redTheme">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="font-regular text-md text-darkGrey leading-150"
          >
            Confirm password
          </label>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <div
            className={`w-full flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${errors.confirmPassword && 'border-redTheme shadow-none'} ${activeInput === 'confirmpassword' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image src="/svg/lock.svg" alt="lock icon" width={16} height={16} />
            <input
              type="confirmPassword"
              id="confirmPassword"
              {...register('confirmPassword')}
              onFocus={() => handleFocus('confirmpassword')}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className="w-full placeholder:text-md bg-white placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-redTheme">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer disabled:bg-purpleDisabled bg-purplePrimary text-semibold text-white rounded-lg px-[27px] py-[11px] leading-150 hover:bg-purpleHover transition"
        >
          <div className="flex items-center justify-center gap-4">
            {isSubmitting && <Loader />}
            Create new account
          </div>
        </button>

        <p className="text-themeGrey text-md line-150 text-center">
          Already have an account?{' '}
          <Link
            className="text-purplePrimary hover:underline transition"
            href="/auth/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
