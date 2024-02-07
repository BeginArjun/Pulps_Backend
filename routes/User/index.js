import express from 'express'
import {
    getUserById,
    createUser,
    getAllUser,
    updateUser,
    authUser,
    getCurrentUser
} from '../../controller/User/index.js'

import protect from '../../middleware/UserAuth.js'

const router=express.Router()

router.route("/").get(getAllUser)
// router.route("/:userId").get(getUserById)
router.route("/update/:userId").post(protect,updateUser)
router.route("/create").post(createUser)

router.route('/login').post(authUser)
router.route('/current').get(protect,getCurrentUser)

export default router