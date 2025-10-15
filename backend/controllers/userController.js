
import {User} from '../models/user.js'

const getAllUsers = async (req, res, err) => {
    try{
        const users = await User.findAll();
        res.json({success: true,users});
    }catch(err){
        next(err)
    }
}

const createUser = async (req, res, next) => {
    try{
        const { name, email } = req.body;
        // console.log(name,email)
        const user = await User.create({ name, email });
        res.json({success: true,user});
    }catch(err){
        next(err)
    }
}

const getSingleUser = async (req, res, err) => {
    try{
        const user = await User.findByPk(req.params.id);
        res.json({success: true,user});
    }catch(err){
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try{
        const { name, email } = req.body;
        await User.update({ name, email }, { where: { id: req.params.id } });
        const updatedUser = await User.findByPk(req.params.id);
        res.json({success: true,updatedUser});
    }catch(err){
        next(err)
    }
}

const deleteUser = async (req, res, next) => {
    try{
        await User.destroy({ where: { id: req.params.id } });
        res.json({success: true, message: "User deleted successfully" })
    }catch(err){
        next(err)
    }
}

export {getAllUsers,createUser,getSingleUser, updateUser, deleteUser}
