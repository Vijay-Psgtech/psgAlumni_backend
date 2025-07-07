const AlumniProfile = require('../models/alumniProfileModel');

exports.getAllAlumni = async(req, res) => {
    try{
        const data = await AlumniProfile.find();
        res.json(data);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}
