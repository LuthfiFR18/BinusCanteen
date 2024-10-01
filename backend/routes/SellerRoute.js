import express from "express";
import {
    getSellers,
    getSellerById,
    createSeller,
    updateSeller,
    deleteSeller
} from "../controllers/SellerController.js";

const router = express.Router();


router.get('/seller', getSellers);
router.get('/seller/:id', getSellerById);
router.post('/seller', createSeller);
router.patch('/seller/:id', updateSeller);
router.delete('/seller/:id', deleteSeller);

export default router;
