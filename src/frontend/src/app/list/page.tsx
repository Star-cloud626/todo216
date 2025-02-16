
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { CreateButton } from './components/createButton';
import { TaskList } from './action/formAction';
import { PaginationComponent } from './components/pagination';


export default async function TaskPage({searchParams}: {searchParams: any}) {
    
    const params = await searchParams;
    
    const data = await TaskList(params);

    return (
        <>
            <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
                <div className='flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>Here&apos;s a list of your tasks for this month!</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <CreateButton />
                    </div>
                </div>
                <DataTable data={data.tasks} columns={columns} />
                <PaginationComponent totalPages={data.total} />
            </div>
        </>
    );
}
