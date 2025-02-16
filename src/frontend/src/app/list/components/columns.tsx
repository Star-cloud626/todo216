'use client';

import { Checkbox } from '@/registry/new-york/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

import { Task } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Task>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='translate-y-[2px]'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-[2px]'
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'title',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>{row.getValue('title')}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'description',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Description' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>{row.getValue('description')}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'priority',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Priority' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>{row.getValue('priority')}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>{row.getValue('status')}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'due_to',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Due to' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>{row.getValue('due_to')}</span>
                </div>
            );
        }
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Action' />,
        cell: ({ row }) => <DataTableRowActions row={row} />
    }
];
