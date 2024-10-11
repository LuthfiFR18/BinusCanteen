import express from "express";
import { createRole,
    getRoleById,
    getRoleName
} from "../controllers/RoleController.js";

const router = express.Router();

router.post('/roles', createRole);
router.get('/role/:id', getRoleById);
router.post('/role', getRoleName);


export default router;