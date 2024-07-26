'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginForm = () => {
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
  };
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex flex-col gap-10 bg-white p-[40px]">
      <div className="flex flex-col gap-2">
        <p className="text-darkGrey font-bold text-lg leading-150">Login</p>
        <p className="text-themeGrey leading-150 text-md font-regular">
          Add your details below to get back into the app
        </p>
      </div>
      <form className="flex flex-col gap-[1.5rem] ">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-regular text-md text-darkGrey leading-150"
          >
            Email Address
          </label>
          <div
            className={`w-[395px] flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${activeInput === 'email' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image src="/svg/email.svg" alt="email icon" width={16} height={16} />
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              placeholder="e.g alex@email.com"
              className="placeholder:text-md w-full placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-regular text-md text-darkGrey leading-150"
          >
            Password
          </label>
          <div
            className={`w-[395px] flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${activeInput === 'password' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image src="/svg/lock.svg" alt="lock icon" width={16} height={16} />
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className="w-full placeholder:text-md placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-purplePrimary text-semibold text-white rounded-lg px-[27px] py-[11px] leading-150 hover:bg-purpleHover transition"
        >
          Login
        </button>

        <p className="text-themeGrey text-md line-150 text-center">
          Don&apos;t have an account?{' '}
          <Link
            className="text-purplePrimary hover:underline transition"
            href="/signup"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
