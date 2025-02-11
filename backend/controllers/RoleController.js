import User from '../models/UserModel.js';
import Roles from '../models/RolesModel.js';


export const createRole = async (req, res) => {
    try {
        const { name } = req.body; // Ambil nama role dari request body
        const role = await Roles.create({ name }); // Buat role baru di database
        res.status(201).json(role); // Kirimkan response dengan data role baru
    } catch (error) {
        res.status(500).json({ message: error.message }); // Tangani error jika ada
    }
};

export const getRoleName = async (req, res) => {
    try {
        const roles = await Roles.findAll({
            attributes: ['uuid', 'name']
        }); // Mengambil atribute dari database
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan peran berdasarkan ID
export const getRoleById = async (req, res) => {
    const { id } = req.params; // Ambil id dari parameter
    try {
        const role = await Roles.findOne({ where: { uuid: id } });
        if (!role) return res.status(404).json({ message: "Role not found" });
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
