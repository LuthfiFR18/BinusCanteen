import multer from 'multer';
import path from 'path';




// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Tentukan folder untuk menyimpan file (misalnya "uploads/")
  },
  filename: (req, file, cb) => {
    // Tentukan nama file yang unik (misalnya menggunakan timestamp dan ekstensi asli file)
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

// Konfigurasi Multer
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024 // Maksimal ukuran file 10MB (opsional)
    },
    fileFilter: (req, file, cb) => {
      // Filter hanya tipe file tertentu (misalnya hanya gambar)
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false);
      }
    }
  });
  
  export default upload;