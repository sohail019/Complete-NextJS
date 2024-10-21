import {z} from "zod"

export const usernameValidationSchema = z
  .string()
  .min(5, "Username must be atleast 5 characters")
  .max(20, "Username must be less than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username should not contain special characters");


export const signUpSchema = z.object({
    username: usernameValidationSchema,
    email: z
        .string()
        .email({message: "Invalid Email Address"}),
    password: z
        .string()
        .min(8, "Password must be atleast 8 characters")
})