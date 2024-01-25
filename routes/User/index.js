import express from 'express'
import {
    getUserById,
    createUser,
    getAllUser,
    updateUser
} from '../../controller/User/index.js'
const router=express.Router()

router.route("/").get(getAllUser)
router.route("/:userId").get(getUserById).post(updateUser)
router.route("/create").post(createUser)

export default router