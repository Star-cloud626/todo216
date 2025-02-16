'use client'

import React from 'react';
import Image from 'next/image';
// import axios from 'axios';

import { UserAuthForm } from '@/app/register/components/user-auth-form';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

export default function AuthenticationPage() {

    
    const router = useRouter();
    const handleSubmit = async (data: any) => {
        try {
        const { user, email, password, repassword } = data;
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: data.user,
                email: data.email,
                password: data.password,
                passwordConfirm: data.repassword
            }),
            credentials: "include", // Required to send cookies
        })
                // const response = await axios.post(url, {
        //     name: user,
        //     email,
        //     password,
        //     passwordConfirm: repassword
        // })
        const response = await res.json();
        console.log(response);
        if(!res.ok) {
            console.log("toast")
            toast.info(response.errorMessage,{
                style: { fontSize: '1rem', padding: '20px' },
                position: 'top-right',
            });
        }
        else if(res.ok) {
            router.push('/login');
        }
        // router.push('/list');
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
                            <h1 className='text-2xl font-semibold tracking-tight'>Register</h1>
                            <p className='text-sm text-muted-foreground'>
                                Enter your information
                            </p>
                        </div>
                        <UserAuthForm handle={handleSubmit}/>
                    </div>
                </div>
        </>
    );
}
