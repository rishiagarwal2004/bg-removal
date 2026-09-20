import express from 'express';
import multer from 'multer';

import { removeBgImage } from '../controllers/imagecController.js';

const imageRouter = express.Router();

const upload = multer({
    dest: 'uploads/'
});

imageRouter.post(
    '/remove-bg',
    upload.single('image'),
    removeBgImage
);

export default imageRouter;