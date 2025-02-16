'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function saveFormData(data: any) {
    console.log('Received data:', data);
    const { title, description, status, priority, due_to } = data;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`;
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
        // const data = await result.json();
        // const tasks = data.data;
    // Process and store the form data (e.g., save to database)
}

export async function updateFormData(data: any) {
    console.log('Received data:', data);
    const { title, description, status, priority, due_to } = data;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${data.id}`;
    const result = await fetch(url,{
        method:'PATCH',
        body: JSON.stringify(data),
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

export async function getItemById(id: number) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if(!token){
        redirect('/login');
    }else{
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`;
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
}

export async function TaskList(params: any){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log(token);
    if(!token){
        redirect('/login');
    }else{
        const queryString = new URLSearchParams(params).toString();
        const url = `${process.env.SERVER_URI}/tasks?${queryString}`;
        const result = await fetch(url,{
            headers: { Cookie: `token=${token}` },
            credentials: "include",
            cache: 'no-store'
        })
        const data = await result.json();
        const tasks = data.data;
        if(!tasks){
            redirect('/login');
        }
        return tasks;
    }
}

export async function GotoCreate(){
    redirect('/list/create');
}

