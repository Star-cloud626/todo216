'use client';

import { useState } from 'react';
import { Button } from '@/registry/new-york/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/registry/new-york/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/registry/new-york/ui/alert-dialog"
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}
type Task = {
    id: number,
    title: string,
    description: string,
    priority: string,
    status: string,
    created_at: Date,
    user_id: number,
    due_to: Date
}
export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    // console.log(process.env.NEXT_PUBLIC_API_BASE_URL, 'url');
    const router = useRouter();
    const [open, setOpen] = useState(false); // State to manage AlertDialog
    const task = row.original as Task;
    const id = task.id;
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`, {
                method: 'DELETE',
                headers: { 
                    Cookie: `token=${token}`,
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });

            if (response.ok) {
                // Handle successful delete, e.g., refresh data or navigate
                console.log("Deleted successfully");
                router.refresh(); // Reload the table or page
            } else {
                console.error("Failed to delete");
            }
        } catch (error) {
            console.error("Error deleting:", error);
        }
        setOpen(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='flex size-8 p-0 data-[state=open]:bg-muted'>
                        <DotsHorizontalIcon className='size-4' />
                        <span className='sr-only'>Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-[160px] bg-white'>
                    <DropdownMenuItem onClick={() => router.push(`/list/edit/${id}`)}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setOpen(true)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Alert Dialog outside of the DropdownMenu */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="bg-white text-black shadow-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this task.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-200 text-black hover:bg-gray-300">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 text-white hover:bg-red-600" onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
