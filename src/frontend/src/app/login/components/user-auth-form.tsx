'use client';

import * as React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/registry/new-york/ui/button';
import { Input } from '@/registry/new-york/ui/input';
import { Label } from '@/registry/new-york/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/registry/new-york/ui/form';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    handle: (data: { email: string; password: string }) => void;
}

//  Zod schema for validation
const LoginFormSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(50, { message: "Email must not be longer than 50 characters." }),
    
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(50, { message: "Password must not be longer than 50 characters." })
});

export function UserAuthForm({ className, handle, ...props }: UserAuthFormProps) {
    const router = useRouter();

    //  Initialize React Hook Form with Zod validation
    const form = useForm({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    //  Handle form submission
    const onSubmit = (data: { email: string; password: string }) => {
        handle(data);
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            {/*  React Hook Form's context provider */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                    {/*  Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="email">Email</Label>
                                <FormControl>
                                    <Input
                                        id="email"
                                        placeholder="Enter your email"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/*  Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="password">Password</Label>
                                <FormControl>
                                    <Input
                                        id="password"
                                        placeholder="Enter your password"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="current-password"
                                        autoCorrect="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/*  Submit Button */}
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </Form>

            {/*  Register Button */}
            <Button onClick={() => router.push('/register')} className="w-full mt-2">
                Register
            </Button>
        </div>
    );
}
