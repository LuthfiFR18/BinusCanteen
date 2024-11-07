import express from "express";
import { 
    getCourses, 
    getCourseById, 
    createCourse, 
    updateCourse, 
    deleteCourse 
} from "../controllers/CourseController.js";

const router = express.Router();

router.get("/courses", getCourses); // Mendapatkan semua course
router.get("/courses/:id", getCourseById); // Mendapatkan course berdasarkan ID
router.post("/courses", createCourse); // Membuat course baru
router.put("/courses/:id", updateCourse); // Mengupdate course berdasarkan ID
router.delete("/courses/:id", deleteCourse); // Menghapus course berdasarkan ID

export default router;
