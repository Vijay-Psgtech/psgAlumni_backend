const express = require('express');
const router = express.Router();
const { getAllAlumni, completeProfile, getAlumniUserById } = require('../controllers/alumniprofileController');
const { authMiddleWare } = require('../utils/auth');
const upload = require('../middleware/uploadMiddleWare')


router.get('/',getAllAlumni);
router.post('/complete-profile',authMiddleWare,upload.single('photo'),completeProfile);
router.get('/AlumniUserName/:id',getAlumniUserById);

module.exports = router;