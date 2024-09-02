import { v2 as cloudinary } from 'cloudinary';
import express from "express";
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
const router = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'adrun',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
}); 
const upload = multer({ storage });

router.post('/image-upload', upload.single('image'), async (req, res) => {
    try {
        res.status(200).json({ filePath: req.file.path });
    } catch (error) {
        res.status(401).json(error) 
    }

})

export default router  