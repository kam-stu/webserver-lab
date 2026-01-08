const multer = require("multer");

// Temp upload directory
const upload = multer({
  dest: "/tmp/uploads",
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB
  }
  // no fileFilter on purpose (insecure)
});

module.exports = upload;

