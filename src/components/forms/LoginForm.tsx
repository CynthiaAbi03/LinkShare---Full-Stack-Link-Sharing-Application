'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLoginSchema } from '../../models/types';
import Loader from '../common/Loader';
import { z } from 'zod';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TLoginSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  });
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const handleFocus = (name: string) => {
    setActiveInput(name);
  };

  const handleBlur = () => {
    setActiveInput(null);
  };

  const onSubmit = async (data: TLoginSchema) => {
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log(data, 'response');
      if (res.status === 200) {
        alert('Login successful');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // type Form = {
  //   email: string;
  //   password: string;
  // };
  // const [form, setForm] = useState<Form>({
  //   email: '',
  //   password: '',
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  return (
    <div className="flex flex-col gap-10 p-[40px] bg-white w-[476px] max-sm:w-[80%] max-sm:p-0">
      <div className="flex flex-col gap-2">
        <p className="text-darkGrey font-bold text-lg leading-150 max-sm:text-2xl">
          Login
        </p>
        <p className="text-themeGrey leading-150 text-md font-regular">
          Add your details below to get back into the app
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[1.5rem] "
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-regular text-md text-darkGrey leading-150"
          >
            Email Address
          </label>
          <div
            className={`max-sm: w-full  flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${errors.email && 'border-redTheme shadow-none'} ${activeInput === 'email' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image
              src="/svg/email.svg"
              alt="email icon"
              width={16}
              height={16}
            />
            <input
              type="email"
              {...register('email')}
              id="email"
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              placeholder="e.g alex@email.com"
              className="placeholder:text-md w-full placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-redTheme">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-regular text-md text-darkGrey leading-150"
          >
            Password
          </label>
          <div
            className={`w-full flex items-center gap-3 border border-border rounded-lg px-4 py-3 ${errors.password && 'border-redTheme shadow-none'} ${activeInput === 'password' ? 'border-purplePrimary shadow-activeShadow' : 'border-border'}`}
          >
            <Image src="/svg/lock.svg" alt="lock icon" width={16} height={16} />
            <input
              type="password"
              {...register('password')}
              id="password"
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className="w-full placeholder:text-md placeholder:font-regular placeholder:leading-150 placeholder:ext-darkGrey outline-none"
            />
          </div>
          {errors.password && (
            <p className="text-redTheme">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer disabled:bg-purpleDisabled bg-purplePrimary text-semibold text-white rounded-lg px-[27px] py-[11px] leading-150 hover:bg-purpleHover transition"
        >
          <div className="flex items-center justify-center gap-4">
            {isSubmitting && <Loader />}
            Login
          </div>
        </button>

        <p className="text-themeGrey text-md line-150 text-center">
          Don&apos;t have an account?{' '}
          <Link
            className="text-purplePrimary hover:underline transition"
            href="/auth/signup"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
