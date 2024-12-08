// src/backend/routes/media.js
const multer = require('multer');
const router = require('express').Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'Archivo subido', path: req.file.path });
});

module.exports = router;
