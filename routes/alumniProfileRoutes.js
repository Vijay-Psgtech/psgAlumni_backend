const express = require('express');
const router = express.Router();
const { getAllAlumni } = require('../controllers/alumniprofileController');

router.get('/',getAllAlumni);

module.exports = router;