
import argon2  from "argon2";
import Users from "../models/UserModel.js";

export const getUser = async(req, res) => {
    try {
        const user = await Users.findAll(); 
        res.json(user); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

export const getUserById = async(req, res) => {
    try {
        const user = await Users.findByPk(req.params.id); 
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
        const user = await Users.findByPk(req.params.id); 
        if (!user) return res.status(404).json({ message: "User not found" }); 

        // Mengupdate data user
        const { name, email, password,phonenumber,roleId } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        // if (password) {
        //     user.password = await argon2.hash(password);
        // }
        user.phonenumber = phonenumber || user.phonenumber;
        user.roleId = roleId || user.roleId;

        await user.save(); // Menyimpan perubahan
        res.json(user); // Mengirimkan data user yang diperbarui
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async(req, res) => {
    try {
        const user = await Users.findByPk(req.params.id); // Mencari user berdasarkan ID
        if (!user) return res.status(404).json({ message: "User not found" }); // Menangani jika tidak ditemukan

        await user.destroy(); // Menghapus user
        res.json({ message: "User deleted" }); // Mengirimkan respons bahwa user dihapus
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}