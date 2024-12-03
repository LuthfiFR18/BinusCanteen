import express from "express";
import {
    getBooth,
    getBoothById,
    createBooth,
    updateBooth,
    deleteBooth,
    getBoothByUserId
} from "../controllers/BoothController.js";

const router = express.Router();


router.get('/booth', getBooth);
// router.get('/booth/:id', getBoothById);
router.post('/booth', createBooth);
router.patch('/booth/:id', updateBooth);
router.delete('/booth/:id', deleteBooth);
router.get('/booth/:userId', getBoothByUserId);


export default router;
