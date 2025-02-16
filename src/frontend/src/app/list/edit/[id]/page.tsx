import { EditForm } from '@/app/list/edit/[id]/edit-form';
import { updateFormData, getItemById } from '../actions/formActions';
import { redirect } from 'next/navigation';

export default async function EditTaskPage(params: any) {
    // Convert id to a number safely

    const id = parseInt(params.params.id, 10);
    if (isNaN(id) || id <= 0) {
        redirect('/list');
    }

    // Fetch the item by ID
    const result = await getItemById(id);
    if (result.message !== "Task found") {
        redirect('/list');
    }

    // Render the form if everything is okay
    return (
        <div className='space-y-12 ml-100'>
            <div>
                <h1 className='text-8xl font-medium'>Task</h1>
                <p className='text-2xl text-muted-foreground'>Make sure to update task information</p>
            </div>
            <EditForm handle={updateFormData} task={result} />
        </div>
    );
}