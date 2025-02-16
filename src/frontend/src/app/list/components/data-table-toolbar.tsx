'use client';

import { Button } from '@/registry/new-york/ui/button';
import { Input } from '@/registry/new-york/ui/input';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { priorities, statuses } from '../data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DayPicker } from 'react-day-picker';
import { useRouter } from 'next/navigation';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const router = useRouter();


    const onReset = () => {
        table.resetColumnFilters();
        router.push('/list');
    }
    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center space-x-2'>
                {table.getColumn('status') && (
                    <DataTableFacetedFilter column={table.getColumn('status')} title='Status' value='status' options={statuses} />
                )}
                {table.getColumn('priority') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('priority')}
                        value='priority'
                        title='Priority'
                        options={priorities}
                    />
                )}
                {isFiltered && (
                    <Button variant='ghost' onClick={onReset} className='h-8 px-2 lg:px-3'>
                        Reset
                        <Cross2Icon className='ml-2 size-4' />
                    </Button>
                )}
            </div>
        </div>
    );
}
