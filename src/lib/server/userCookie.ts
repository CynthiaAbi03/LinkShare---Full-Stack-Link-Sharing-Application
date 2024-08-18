'use server';

import { cookies } from 'next/headers';

const getCookie = () => {
  const userData = cookies().get('userData')?.value || '';
  console.log(userData, 'userData');
  return userData;
};

export default getCookie;
