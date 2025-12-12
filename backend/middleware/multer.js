// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, path.join(__dirname, 'uploads')); // Save to uploads folder
//   },
//   filename: function(req, file, callback) {
//     callback(null, file.originalname); // Use original filename
//   }
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });
export default upload;
