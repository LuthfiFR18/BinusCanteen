import Courses from "../models/CourseModel.js";

// Mendapatkan semua course
export const getCourses = async (req, res) => {
    try {
        const courses = await Courses.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan course berdasarkan ID
export const getCourseById = async (req, res) => {
    try {
        const course = await Courses.findByPk(req.params.id);
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat course baru
export const createCourse = async (req, res) => {
    try {
        const course = await Courses.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate course berdasarkan ID
export const updateCourse = async (req, res) => {
    try {
        const course = await Courses.findByPk(req.params.id);
        if (course) {
            await course.update(req.body);
            res.json(course);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus course berdasarkan ID
export const deleteCourse = async (req, res) => {
    try {
        const course = await Courses.findByPk(req.params.id);
        if (course) {
            await course.destroy();
            res.json({ message: "Course deleted successfully" });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
