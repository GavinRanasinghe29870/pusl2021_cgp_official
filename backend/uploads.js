const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Path to frontend/public/uploads
const uploadDir = path.join(__dirname, '../frontend/public/uploads');

// Ensure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads folder created:', uploadDir);
} else {
  console.log('Uploads folder already exists:', uploadDir);
}

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Saving to:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    console.log('Saving file:', uniqueName);
    cb(null, uniqueName);
  },
});

// File Filter (Allow only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

// Multer Upload Middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
