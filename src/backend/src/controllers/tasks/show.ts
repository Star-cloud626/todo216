import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Task } from 'orm/entities/tasks/Task';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const taskRepository = getRepository(Task);
  try {
    const task = await taskRepository.findOne(id);

    if (!task) {
      const customError = new CustomError(404, 'General', `Task with id:${id} not found.`, ['Task not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Task found', task);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
