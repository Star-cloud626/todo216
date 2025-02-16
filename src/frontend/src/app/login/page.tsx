'use client'

import React from 'react';

import { UserAuthForm } from '@/app/login/components/user-auth-form';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

export default function AuthenticationPage() {
    const router = useRouter();
    const handleSubmit = async (data: any) => {
        try {
            const { email, password } = data;
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include", // Required to send cookies
        });
        const result = await res.json();
        if(res.ok){
            localStorage.setItem('token',result.data)
            router.push('/list');
        }else {
            toast.info(result.errors[0],{
                    style: { fontSize: '1rem', padding: '20px' },
                    position: 'top-right',
            });
            console.log("err");
        }
        }catch(err){
            console.error(
                'You have an error in your code or there are Network issues.',
                err,
            )
        }
    }
    return (
        <>
            <div className='container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0'>

                    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                        <div className='flex flex-col space-y-2 text-center'>
                            <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
                            <p className='text-sm text-muted-foreground'>
                                Enter your email and password
                            </p>
                        </div>
                        <UserAuthForm handle={handleSubmit}/>
                    </div>
                </div>
        </>
    );
}
