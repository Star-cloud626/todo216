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
    handle: (data: { user: string; email: string; password: string; repassword: string }) => void;
}

// 🎯 Zod schema for validation
const RegisterFormSchema = z.object({
    user: z.string().min(3, "Name must be at least 3 characters long."),
    email: z.string().email("Invalid email format."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    repassword: z.string(),
}).refine((data) => data.password === data.repassword, {
    message: "Passwords do not match.",
    path: ["repassword"],
});

export function UserAuthForm({ className, handle, ...props }: UserAuthFormProps) {
    const router = useRouter();

    // 🧠 Initialize React Hook Form with Zod validation
    const form = useForm({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            user: '',
            email: '',
            password: '',
            repassword: '',
        },
    });

    // 🚀 Handle form submission
    const onSubmit = (data: { user: string; email: string; password: string; repassword: string }) => {
        handle(data);
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                    {/* 👤 Name Field */}
                    <FormField
                        control={form.control}
                        name="user"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="user">Name</Label>
                                <FormControl>
                                    <Input id="user" placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 📧 Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="email">Email</Label>
                                <FormControl>
                                    <Input id="email" type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 🔒 Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="password">Password</Label>
                                <FormControl>
                                    <Input id="password" type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 🔐 Re-Password Field */}
                    <FormField
                        control={form.control}
                        name="repassword"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="repassword">Re-Password</Label>
                                <FormControl>
                                    <Input id="repassword" type="password" placeholder="Re-enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 🚀 Submit Button */}
                    <Button type="submit" className="w-full">Register</Button>
                </form>
            </Form>

            {/* 🔗 Login Button */}
            <Button onClick={() => router.push('/login')} className="w-full mt-2">
                Login
            </Button>
        </div>
    );
}
