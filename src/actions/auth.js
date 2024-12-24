"use server";

import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function register(state,formData){
    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });
    
    if(!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get("email"),
        };
    }
    const { email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCollection = await getCollection("users");
    if(!userCollection) {
        return {
            errors: {
                email: "Server Not Found",
            },
        };
    }
    const existingUser = await userCollection.findOne({email});
    if(existingUser) {
        return {
            errors: {
                email: "Email already in use",
            },
        };
    }
    const result = await userCollection.insertOne({
        email,
        password: hashedPassword,
    });
    
    // redirect user
    redirect("/dashboard");
}