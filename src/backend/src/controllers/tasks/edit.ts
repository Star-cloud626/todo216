import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Task } from 'orm/entities/tasks/Task';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { producer } from '../../kafka/producer';
import { createHistory } from 'utils/createTaskHistory';
import { CompressionTypes } from 'kafkajs'

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { title, description, priority, status, due_to } = req.body;

    const taskRepository = getRepository(Task);
    const userRepository = getRepository(User);
    try {
        const user = await userRepository.findOne({ id: req.jwtPayload.id });
        const task = await taskRepository.findOne({ where: { id } });
        if (!task) {
            const customError = new CustomError(404, 'General', `Task with id:${id} not found.`, ['Task not found.']);
            return next(customError);
        }

        const previous = task;

        task.title = title;
        task.description = description;
        task.priority = priority;
        task.status = status;
        task.due_to = due_to;
        task.assigned_to = user;
        try {
            const result = await taskRepository.save(task);
            const history = {
                task_id: result.id,
                change_type: `${result.title} is updated`,
                new_value: result,
                previous_value: previous
            }
            await createHistory(history);
            const prod = await producer();
            await prod.send({
                topic: 'real',
                compression: CompressionTypes.GZIP,
                messages: [
                    {
                        key: 'msg',
                        value: `Updated ${task.title} by ${task.assigned_to.username}`
                    }
                ],
            })
            res.customSuccess(200, 'Task successfully saved.');

        } catch (err) {
            const customError = new CustomError(409, 'Raw', `User '${task.title}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
