import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorTask = (req: Request, res: Response, next: NextFunction) => {
    
    let { title, description, priority, status, due_to } = req.body;
    const errorsValidation: ErrorValidation[] = [];
    title = !title ? '' : title;
    description = !description ? '' : description;
    priority = !priority ? '' : priority;
    status = !status ? '' : status;
    due_to = !due_to ? '' : due_to;

    if (validator.isEmpty(title)) {
        errorsValidation.push({ email: 'Title is required' });
    }
    if (validator.isEmpty(description)) {
        errorsValidation.push({ description: 'Description is required' });
    }
    if (validator.isEmpty(priority)) {
        errorsValidation.push({ priority: 'Priority is required' });
    }
    if (validator.isEmpty(status)) {
        errorsValidation.push({ status: 'Status is required' });
    }
    if (validator.isEmpty(due_to)) {
        errorsValidation.push({ due_to: 'Due Date is invalid' });
    }
    if (errorsValidation.length !== 0) {
        const customError = new CustomError(400, 'Validation', 'Task validation error', null, null, errorsValidation);
        return next(customError);
    }

    return next();
}