import User from '../models/UserModel.js';
import Role from '../models/RoleModel.js';

export const getUsersWithRoles = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Role,
                attributes: ['roletype'] // Mengambil hanya atribut roletype dari Role
            }]
        });
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
