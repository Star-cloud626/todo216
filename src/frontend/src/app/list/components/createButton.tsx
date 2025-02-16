"use client";

import { Button } from "@/registry/new-york/ui/button";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";

export const CreateButton = () => {
    const router = useRouter();
    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    const onCreate = () => {
        console.log("Navigating to /list/create");
        setTimeout(() => {
            router.push('/list/create');
        }, 200); // Add a small delay
        // redirect('/list/create');
    }

    // if (!mounted) return null; // Prevent hydration mismatch

    return (
        <Button 
            className="mb-[-127px]" 
            onClick={onCreate}
        >
            Create
        </Button>
    );
};
