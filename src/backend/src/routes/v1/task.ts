import { Router } from 'express';

import { create, list, show, edit, destroy } from 'controllers/tasks';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
import { validatorTask } from 'middleware/validation/task/validator';

const router = Router();


router.get('/', [checkJwt], list);

router.post('/', [checkJwt, validatorTask], create);

router.get('/:id([0-9]+)', [checkJwt], show);

router.patch('/:id([0-9]+)', [checkJwt, validatorTask], edit);

router.delete('/:id([0-9]+)', [checkJwt], destroy);

export default router; 