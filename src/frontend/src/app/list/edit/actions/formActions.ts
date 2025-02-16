'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function updateFormData(data: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if(!token){
        redirect('login');
    }{
        const url = `${process.env.SERVER_URI}/tasks/${data.id}`;
        const result = await fetch(url,{
            method:'PATCH',
            body: JSON.stringify(data),
            headers: { 
                Cookie: `token=${token}`,
                "Content-Type": "application/json"
    
            },
            credentials: "include",
        })
        console.log(result);
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

export async function getItemById(id: number) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const url = `${process.env.SERVER_URI}/tasks/${id}`;
    const result = await fetch(url,{
        method:'GET',
        headers: { 
            Cookie: `token=${token}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
    })
    const final = await result.json();
    return final;
}