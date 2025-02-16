import { CreateForm } from '@/app/list/create/create-form';
import { saveFormData } from './actions/formActions';

export default function CreateTaskPage() {
    return (
        <div className='space-y-12 ml-100'>
            <div>
                <h1 className='text-8xl font-medium'>Task</h1>
                <p className='text-2xl text-muted-foreground'>Make sure new task information</p>
            </div>
            <CreateForm handle={saveFormData} />
        </div>
    );
}
