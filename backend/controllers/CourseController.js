import Courses from "../models/CourseModel.js";
import Users from "../models/UserModel.js";

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
export const getCourseByUserId = async (req, res) => {
    try {
        // Get userId from params
        const { userId } = req.params;
        console.log('User ID:', userId);

        // Validate userId
        if (!userId || isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid userId parameter' });
        }

        // Fetch all cart items for the user and include product details
        const courses = await Courses.findAll({
            where: { userId }, // filter by userId
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['id', 'name', 'uuid'], // Include user details (if needed)
                },
            ],
        });
        return res.status(200).json({
            courses, // returns cart items with products details
        });
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
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
