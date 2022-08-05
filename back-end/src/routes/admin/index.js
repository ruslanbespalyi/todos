import express from 'express';
import adminUsers from './admin.users.js';
import adminTodos from './admin.todos.js';

const router = express.Router();
//Для зручносты розділимо на різні файли щоб окремо працювати з endpoints user & todo для адміна
router.use('/users', adminUsers);
router.use('/todos', adminTodos);

export default router;
