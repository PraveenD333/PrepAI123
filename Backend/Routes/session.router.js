import express from 'express'
import { protect } from '../Middleware/auth.midd.js'
import { createsession, deletesession, getsession, getsessionById } from '../Controllers/session.cont.js'

const router=express.Router()

router.post("/create",protect,createsession);
router.get("/my-sessions",protect,getsession);
router.get ("/:id",protect,getsessionById);
router.delete("/:id",protect,deletesession);


export default router;