import express from 'express';
import { addBook, listBook, removeBook, singleBook } from '../controllers/bookController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const bookRouter = express.Router();

bookRouter.post('/add', adminAuth, upload.single("image"), addBook);
bookRouter.post('/remove', adminAuth, removeBook);
bookRouter.post('/single', singleBook);
bookRouter.get('/list', listBook)

export default bookRouter;