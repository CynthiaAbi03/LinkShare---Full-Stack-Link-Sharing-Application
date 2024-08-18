import { profile } from 'console';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png'];
const MAX_FILE_SIZE = 1024 * 1024;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const profileDetailsSchema = z.object({
  profilePicture: z.string().optional(),
  firstName: z.string().min(4, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
});

export type TProfileDetailsSchema = z.infer<typeof profileDetailsSchema>;
