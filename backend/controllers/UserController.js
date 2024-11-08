
import argon2  from "argon2";
import Users from "../models/UserModel.js";
import Roles from "../models/RolesModel.js";

export const getUser = async(req, res) => {
    try {
        const user = await Users.findAll({
            include: [{
                model: Roles,
                as: 'role',
                attributes: ['name']
            }]
        }); 
        
        res.json(user); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

export const getUserById = async(req, res) => {
    try {
        const user = await Users.findByPk(req.params.uuid); 
        if (!user) return res.status(404).json({ message: "User not found" }); 
        res.json(user); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async(req, res) => {
    
    const { uuid, name, email, password,phonenumber,roleId } = req.body;
    //const hashPassword = await argon2.hash(password)

    try {
        const newUser = await Users.create({ uuid, name, email, password, phonenumber,  roleId }); 
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async(req, res) => {
    try {
        const user = await Users.findOne({ where: { uuid: req.params.id } }); 
        if (!user) return res.status(404).json({ message: "User not found" }); 

        // Mengupdate data user
        const { name, email, password,phonenumber,image } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password||user.password;
        user.phonenumber = phonenumber|| user.phonenumber;
        user.image = image || user.image;
        // if (password) {
        //     user.password = await argon2.hash(password);
        // }

        await user.save(); // Menyimpan perubahan
        res.json(user); // Mengirimkan data user yang diperbarui
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async(req, res) => {
    try {
        const user = await Users.findOne({ where: { uuid: req.params.id } });
        if (!user) return res.status(404).json({ message: "User not found" }); 

        await user.destroy();
        res.json({ message: "User deleted" }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}