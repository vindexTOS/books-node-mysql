import express from 'express'
import { GetBooks, PostBook } from '../controllers/book-controller.js'
const router = express.Router()

router.route('/books').get(GetBooks).post(PostBook)
export default router
