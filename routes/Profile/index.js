import express from "express"
import protect from "../../middleware/UserAuth.js"
import {getProfile} from "../../controller/Profile/index.js"
const router=express.Router()

router.route("/:id").get(protect,getProfile)

export default router