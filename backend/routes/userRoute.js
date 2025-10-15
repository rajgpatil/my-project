import express from 'express'
import {getAllUsers,createUser,getSingleUser, updateUser, deleteUser} from '../controllers/userController.js'
const router = express.Router()

router.post("/", createUser)
router.get("/",getAllUsers)
router.get("/:id",getSingleUser)
router.put("/:id",updateUser)
router.delete("/:id", deleteUser)

export default router