import { Request, Response, NextFunction } from 'express';

import { Equal, getRepository } from 'typeorm';
import { Task } from 'orm/entities/tasks/Task';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';


export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User);
  const taskRepository = getRepository(Task);
  try {

    const user = await userRepository.findOne({ id: req.jwtPayload.id });


    let db_query = {};
    const query = req.query;
    const pageSize = query.pageSize ? Number(query.pageSize) : 10;
    const pagination = query.pagination ? Number(query.pagination) : 1;
    const offset = (pagination - 1) * pageSize;
    const status = query.status ? (query.status == 'ToDo' ? 'To Do' : (query.status == 'Progress' ? 'In Progress' : (query.status == 'Done' ? 'Done' : ''))) : '';
    const priority = query.priority ? query.priority : '';
    const due_to = query.due_to ? query.due_to : '';
    const dueToString = typeof due_to === "string" ? due_to : "";
    if (priority !== '') {
      db_query = { priority: priority, ...db_query }
    }
    if (status !== '') {
      db_query = { ...db_query, status: status }
    }
    let formattedTasks = [];
    let total = 0;
    if (due_to !== '') {
      const [tasks, totalCount] = await taskRepository.findAndCount({
        select: ['id', 'title', 'description', 'status', 'priority', 'due_to'],
        where: {
            ...db_query,
            due_to: Equal(new Date(dueToString)),
            assigned_to: user
        },
        skip: offset, // Pagination offset
        take: pageSize // Number of records per page
    });
    
    
    // Map results to exclude `assigned_to` if necessary
      formattedTasks = tasks.map(({ assigned_to, ...rest }) => rest);
      total = totalCount;
    } else {
      const [tasks, totalCount] = await taskRepository.findAndCount({
        select: ['id', 'title', 'description', 'status', 'priority', 'due_to'],
        where: {
            ...db_query,
            assigned_to: user
        },
        skip: offset, // Pagination offset
        take: pageSize // Number of records per page
    });
    
    // Map results to exclude `assigned_to` if necessary
    formattedTasks = tasks.map(({ assigned_to, ...rest }) => rest);
    total = Math.ceil(totalCount / pageSize);
    }
    const data = {
      tasks: formattedTasks,
      total: total
    }
    res.customSuccess(200, 'List of tasks.', data);
  } catch (err) {
    console.log(err);
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of tasks.`, null, err);
    return next(customError);
  }
}