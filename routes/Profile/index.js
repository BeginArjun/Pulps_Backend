import express from "express"
import {getProfile} from "../../controller/Profile/index.js"
const router=express.Router()

router.route("/:id").get(getProfile)

export default router