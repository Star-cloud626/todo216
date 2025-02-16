import { Router } from 'express';
import passport from 'passport';

import auth from './auth';
import users from './users';
import tasks from './task';

const router = Router();

const requireAuth = passport.authenticate('jwt', {
    session: false
  });
//   const requireSignIn = passport.authenticate('local', {
//     session: false
//   });

router.use('/auth', auth);
router.use('/users', users);
router.use('/tasks', tasks);

export default router;
