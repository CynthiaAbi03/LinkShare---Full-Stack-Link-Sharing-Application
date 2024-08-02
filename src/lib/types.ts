import {z} from 'zod';

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
  
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
  })
  
export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required")
})

export type TLoginSchema = z.infer<typeof loginSchema>

export const profileDetailsSchema = z.object({
    firstName: z.string().min(4, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address").optional().or(z.literal('')),
})

export type TProfileDetailsSchema = z.infer<typeof profileDetailsSchema>;