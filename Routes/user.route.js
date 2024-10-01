import express from 'express';
import { userController } from '../Controllers/user.controller.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

export default router;
