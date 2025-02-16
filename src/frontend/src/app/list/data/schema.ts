import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    priority: z.string(),
    due_date: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
