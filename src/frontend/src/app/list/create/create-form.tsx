'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/registry/new-york/ui/button';
import { Calendar } from '@/registry/default/ui/calendar';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/registry/new-york/ui/form';
import { Input } from '@/registry/new-york/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york/ui/select';
import { Textarea } from '@/registry/new-york/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from "date-fns"

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { description } from '@/registry/new-york/block/chart-area-axes';

const CreateFormSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: 'Title must be at least 2 characters.'
        })
        .max(30, {
            message: 'Title must not be longer than 30 characters.'
        }),
    status: z
        .string({
            required_error: 'Please select Status of Task'
        }),
    description: z.string().max(160).min(4),
    priority: z
        .string({
            required_error: 'Please select Priority of Task'
        }), 
    due_to: z.date({
        required_error: 'A date of Due is required.'
    }),
});

type CreateFormValues = z.infer<typeof CreateFormSchema>;

const defaultValues: Partial<CreateFormValues> = {
    title: '',
    description: 'My first job',
    status: '',
    priority: '',
    due_to: undefined,
};

export function CreateForm({ handle }: { handle: (data: any) => Promise<void> }) {
    const form = useForm<CreateFormValues>({
        resolver: zodResolver(CreateFormSchema),
        defaultValues,
        mode: 'onChange'
    });

    function onSubmit(data: CreateFormValues) {
        const adjustedDate = {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            due_to: new Date(data.due_to.getTime() - data.due_to.getTimezoneOffset() * 60000)
        }
        handle(adjustedDate);
    }

    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input className="w-200 h-14 text-lg p-4"  placeholder='Type task title...' {...field} value={field.value ?? ''} />
                                </FormControl>
                                <FormDescription>
                                    This is title of the task
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='Tell us a little bit about yourself'
                                        className='resize-none w-200 h-50 text-lg p-4'
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormDescription>
                                    You can <span>@mention</span> more info about task
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="w-200 h-10 text-lg p-4">
                                            <SelectValue placeholder='Select Status to display' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white">
                                        <SelectItem value='To Do'>To Do</SelectItem>
                                        <SelectItem value='In Progress'>In Progress</SelectItem>
                                        <SelectItem value='Done'>Done</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    You can set status of Task
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='priority'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="w-200 h-10 text-lg p-4 ">
                                            <SelectValue placeholder='Select Priority to display' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white">
                                        <SelectItem value='Low'>Low</SelectItem>
                                        <SelectItem value='Medium'>Medium</SelectItem>
                                        <SelectItem value='High'>High</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    You can set priority of Task
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='due_to'
                        render={({ field }) => (
                            <FormItem className='flex flex-col '>
                                <FormLabel>Due_to Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'w-200 h-10 text-lg p-4 text-left font-normal',
                                                    !field.value && 'text-muted-foreground'
                                                )}>
                                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                <CalendarIcon className='ml-auto size-4 opacity-50' />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0' align='start'>
                                        <Calendar
                                            mode='single'
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            className="bg-white"
                                            disabled={(date) => date < new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Create New Task</Button>
                </form>
            </Form>
    );
}
