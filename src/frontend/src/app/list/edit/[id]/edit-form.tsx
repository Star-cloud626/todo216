'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/registry/new-york/ui/button';
import { Calendar } from '@/registry/default/ui/calendar';
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/registry/new-york/ui/form';
import { Input } from '@/registry/new-york/ui/input';
import { Textarea } from '@/registry/new-york/ui/textarea';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/registry/new-york/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover';

const EditFormSchema = z.object({
    id: z.number(),
    title: z.string().min(2).max(30),
    status: z.string(),
    description: z.string().max(160).min(4),
    priority: z.string(),
    due_to: z.date(),
});

type EditFormValues = z.infer<typeof EditFormSchema>;

export function EditForm({ handle, task }: { handle: (data: any) => Promise<void>, task: any }) {
    const form = useForm<EditFormValues>({
        resolver: zodResolver(EditFormSchema),
        defaultValues: {
            id: task.data?.id || 0,
            title: task.data?.title || '',
            status: task.data?.status || '',
            description: task.data?.description || '',
            priority: task.data?.priority || '',
            due_to: task.data?.due_to ? new Date(task.data.due_to) : undefined,
        },
        mode: 'onChange'
    });

    function onSubmit(data: EditFormValues) {
        // const adjustedDate = {
        //     title: data.title,
        //     description: data.description,
        //     status: data.status,
        //     priority: data.priority,
        //     due_to: new Date(data.due_to.getTime() - data.due_to.getTimezoneOffset() * 60000)
        // }
        handle(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                {/* Title */}
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input className="w-200 h-14 text-lg p-4" placeholder='Type task title...' {...field} />
                            </FormControl>
                            <FormDescription>This is the title of the task</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Tell us a little bit about the task'
                                    className='resize-none w-200 h-50 text-lg p-4'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>You can add more details about the task here.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status */}
                <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className="w-200 h-10 text-lg p-4">
                                        <SelectValue placeholder='Select Status' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    <SelectItem value='To Do'>To Do</SelectItem>
                                    <SelectItem value='In Progress'>In Progress</SelectItem>
                                    <SelectItem value='Done'>Done</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>Select the current status of the task.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Priority */}
                <FormField
                    control={form.control}
                    name='priority'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className="w-200 h-10 text-lg p-4">
                                        <SelectValue placeholder='Select Priority' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    <SelectItem value='Low'>Low</SelectItem>
                                    <SelectItem value='Medium'>Medium</SelectItem>
                                    <SelectItem value='High'>High</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>Select the priority level of the task.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Due Date */}
                <FormField
                    control={form.control}
                    name='due_to'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant='outline'
                                            className={cn('w-200 h-10 text-lg p-4 text-left font-normal', !field.value && 'text-muted-foreground')}
                                        >
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

                <Button type='submit'>Update Task</Button>
            </form>
        </Form>
    );
}
