import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Task } from 'orm/entities/tasks/Task';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { createHistory } from 'utils/createTaskHistory';
import { producer } from '../../kafka/producer';
import { CompressionTypes } from 'kafkajs'

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const taskRepository = getRepository(Task);
  try {
    const task = await taskRepository.findOne(id);

    if (!task) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Task with id:${id} doesn't exists.`]);
      return next(customError);
    }

    const history = {
      task_id: task.id,
      change_type: `${task.title} is created`,
      new_value: {},
      previous_value: task
    }

    console.log(task);
    const result = await taskRepository.delete(task.id);
    await createHistory(history);
    const prod = await producer();
    await prod.send({
      topic: 'real',
      compression: CompressionTypes.GZIP,
      messages: [
        {
          key: 'msg',
          value: `Deleted ${task.title} by ${task.assigned_to.username}`
        }
      ],
    })
    await prod.disconnect()

    res.customSuccess(200, 'Task successfully deleted.', { id: task.id, title: task.title });
  } catch (err) {
    console.log(err);
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
