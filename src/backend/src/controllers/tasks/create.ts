import { Request, Response, NextFunction } from 'express';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { getRepository } from 'typeorm';
import { Task } from 'orm/entities/tasks/Task';
import { User } from "orm/entities/users/User";
import { createHistory } from 'utils/createTaskHistory';
import { producer } from '../../kafka/producer';
import { CompressionTypes } from 'kafkajs'

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, priority, status, due_to } = req.body;
    const taskRepository = getRepository(Task);
    const userRepository = getRepository(User);

    
    // const user = await userRepository.findOneBy({ id: req.jwtPayload.id });
    try {
        const task = await taskRepository.findOne({ where: { title } });
        const user = await userRepository.findOne({ id: req.jwtPayload.id });
        if (task) {
            const customError = new CustomError(400, 'General', 'Task already exists', [
                `Task '${task.title}' already exists`,
            ]);
            return next(customError);
        }

        try {
            const newTask = new Task();
            newTask.title = title;
            newTask.description = description;
            newTask.priority = priority;
            newTask.status = status;
            newTask.due_to = due_to
            newTask.assigned_to = user;
            const result = await taskRepository.save(newTask);
            console.log(result);
            const history = {
                task_id: result.id,
                change_type: `${result.title} is created`,
                new_value: result,
                previous_value: {}
            }
            await createHistory(history);
            const prod = await producer();
            await prod.send({
                topic: 'real',
                compression: CompressionTypes.GZIP,
                messages: [
                    {
                        key: 'msg',
                        value: `created new task by ${newTask.assigned_to.username}`
                    }
                ],
            })
            await prod.disconnect()
            
            res.customSuccess(200, 'Task successfully created.');
        } catch (err) {
            const customError = new CustomError(400, 'Raw', `Task '${title}' can't be created`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};