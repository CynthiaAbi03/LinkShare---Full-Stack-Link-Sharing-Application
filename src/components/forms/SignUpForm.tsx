'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SignUpForm = () => {
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const handleFocus = (name: string) => {
    setActiveInput(name);
  };

  const handleBlur = () => {
    setActiveInput(null);
  };
  type Form = {
    email: string;
    password: string;
    confirmPassword: string;
  };
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
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
      <form className="flex flex-col gap-[1.5rem] max-sm:gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-regular text-md text-darkGrey leading-150"
          >
            Email Address
          </label>
          <div
            className={`w-full flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${activeInput === 'email' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image
              src="/svg/email.svg"
              alt="email icon"
              width={16}
              height={16}
            />
            <input
              type="email"
              name="email"
              id="email"
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="e.g alex@email.com"
              className=" w-full placeholder:text-md placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-regular text-md text-darkGrey leading-150"
            >
              Password
            </label>
            <p className="font-regular text-[14px] text-themeGrey leading-150">
              Password must contain at least 8 characters
            </p>
          </div>
          <div
            className={`w-full flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${activeInput === 'password' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image src="/svg/lock.svg" alt="lock icon" width={16} height={16} />
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              placeholder="At least 8 characters"
              className=" w-full placeholder:text-md placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="font-regular text-md text-darkGrey leading-150"
          >
            Confirm password
          </label>
          <div
            className={`w-full flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${activeInput === 'confirmpassword' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image src="/svg/lock.svg" alt="lock icon" width={16} height={16} />
            <input
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
              onFocus={() => handleFocus('confirmpassword')}
              onBlur={handleBlur}
              placeholder="At least 8 characters"
              className="w-full placeholder:text-md placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-purplePrimary text-semibold text-white rounded-lg px-[27px] py-[11px] leading-150 hover:bg-purpleHover transition"
        >
          Create new account
        </button>

        <p className="text-themeGrey text-md line-150 text-center">
          Already have an account?{' '}
          <Link
            className="text-purplePrimary hover:underline transition"
            href="/"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
