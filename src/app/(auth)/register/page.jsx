"use client";
import { register } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterPage() {
    const [state, action, isPending] = useActionState(register, undefined);
    return (
        <div className="container w-1/2">
            <h1 className="title">Register</h1>

            <form action={action}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={state?.email} />
                    {state?.errors?.email && <p className="error">{state.errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                    <div className="error">
                        {state?.errors.password && <p>Password must:</p>}
                        <ul className="list-disc list-inside ml-4">
                            {state?.errors?.password?.map((error, index) => (
                                <li key={index} className="error">{error}</li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />
                    {state?.errors?.confirmPassword && <p className="error">{state.errors.confirmPassword}</p>}
                </div>
                <div className="flex items-end gap-4 mt-3">
                    <button disabled={isPending} className="btn-primary">
                        {isPending ? "Loading..." : "Register"}
                    </button>
                    <Link href="/login" className="text-link">or login here</Link>
                </div>
            </form>

        </div>
    );
}