import express from "express";
import {getUser,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/user', /*verifyUser, adminOnly,*/ getUser);
router.get('/user/:email', getUserByEmail);
router.get('/user/id',/*verifyUser, adminOnly,*/ getUserById);
router.post('/user', createUser);
router.patch('/user/:id', /*verifyUser, adminOnly,*/ updateUser);
router.delete('/user/:id', /*verifyUser, adminOnly,*/ deleteUser);

export default router;