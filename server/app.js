const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const app = express();

const upload = multer({ dest: 'public/uploads/images' });
app.use(express.static('public'));

app.post('/upload', upload.fields([{ name: 'markerImage' }, { name: 'videoFile' }]), (req, res) => {
  const imagePath = req.files.markerImage[0].path;
  const videoPath = req.files.videoFile[0].path;

  const markerName = path.basename(imagePath);
  exec(`python3 scripts/make-pattern.py ${imagePath} public/markers/${markerName}.patt`, (err) => {
    if (err) return res.status(500).send("Pattern generation failed");
    res.redirect('/ar-viewer.html');
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
