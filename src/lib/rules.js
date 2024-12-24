import {z} from 'zod';
export const RegisterFormSchema = z.object({
    email: z.string().email({message: "Please enter a valid email"}).trim(),
    password: z.string()
    .min(1, {message: "Password is required"})
    .min(5, {message: "Password must be at least 5 characters long"})
    .regex(/[a-zA-Z]/, {message: "Password must contain at least one letter"})
    .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least one special character"}),

    confirmPassword: z.string().trim()
}).superRefine((val, ctx)=> {
    if(val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password fields do not match",
            path: ["confirmPassword"],
        });
    }
});