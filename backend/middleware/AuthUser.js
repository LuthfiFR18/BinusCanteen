import User from "../models/UserModel.js"

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: " Mohon login ke akun anda"});

    }
    const user = await User.findOne ({

        where: {
            uuid: req.session.userId
        }
    
    });
    if (!user) return res.status(404).json({msg: "user tidak ditemukan"})
    res.userId = user.id;
    req.role = user.roleId;
    next();

}

export const adminOnly = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: " Mohon login ke akun anda"});

    }
    const user = await User.findOne ({

        where: {
            uuid: req.session.userId
        }
    
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
    if (user.roleId !== 1) return res.status(403).json({msg: "Akses terlarang"});
    
    next();
    
}
