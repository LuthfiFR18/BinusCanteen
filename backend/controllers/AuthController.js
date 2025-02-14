import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await Users.findOne ({
        where: {
            email: req.body.email
        }
    
    });
    if (!user) return res.status(404).json({msg: "user tidak ditemukan"})
    //const match = await argon2.verify(user.password, req.body.password);
    if (user.password !== req.body.password) {
        return res.status(400).json({msg: "Password salah"});
    }
    //if (!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const roleId = user.roleId;
    res.status(200).json({uuid, name, email, roleId});
};

export const Me = async (req, res)=>{
    if(!req.session.userId){
        return res.status(401).json({msg: " Mohon login ke akun anda"});

    }
    const user = await Users.findOne ({
        attributes:['uuid','id','name','email','password','roleId'],

        where: {
            uuid: req.session.userId
        }
    
    });
    if (!user) return res.status(404).json({msg: "user tidak ditemukan"})
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"})
    });
};