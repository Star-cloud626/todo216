'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function saveFormData(data: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log(token);
    if(!token) {
        redirect('/login');
    }else{
        const url = `${process.env.SERVER_URI}/tasks`;
        const result = await fetch(url,{
            method:'POST',
            body:JSON.stringify(data),
            headers: { 
                Cookie: `token=${token}`,
                "Content-Type": "application/json"
    
            },
            credentials: "include",
        })
        const final = await result.json();
        if(final){
            redirect('/list');
        }else {
            console.log(final);
        }
    }
        // const data = await result.json();
        // const tasks = data.data;
    // Process and store the form data (e.g., save to database)
}