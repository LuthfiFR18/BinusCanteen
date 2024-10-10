import express from "express";
import {
    getRoleById,
    getRoles
} from "../controllers/CartController.js";

const router = express.Router();

router.get('/role/:id', getRoleById);
router.post('/role', getRoles);


export default router;