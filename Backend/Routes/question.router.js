import express from 'express'
import { addquestionsToSession, togglePinQuestion, updateQuestionNote } from '../Controllers/question.cont.js'
import { protect } from '../Middleware/auth.midd.js'

const router=express.Router()

router.post('/add',protect,addquestionsToSession);
router.post('/:id/pin',protect,togglePinQuestion);
router.post('/:id/note',protect,updateQuestionNote);

export default router;
