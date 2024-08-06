import crypto from 'crypto';

//import authConfig from '@/config/authConfig';

const SECRET = 'Cynthia-REST';

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentification = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};

