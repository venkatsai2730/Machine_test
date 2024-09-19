const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
    storage: multer.memoryStorage(), // Stores files in memory (buffer)
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;