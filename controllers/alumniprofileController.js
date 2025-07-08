const AlumniProfile = require('../models/alumniProfileModel');
const getNextAlumniId = require('../utils/generateAlumniId');
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.getAllAlumni = async(req, res) => {
    try{
        const data = await AlumniProfile.find();
        res.json(data);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

exports.completeProfile = async(req, res) => {
    const userId = req.user.id;
    const year = new Date().getFullYear();
    const alumniId = await getNextAlumniId(year);

    const { first_name, last_name, email, batch, branch, passingYear, city, country, latitude, longitude } = req.body;
    const  updateData = {
        first_name,
        last_name,
        email,
        batch,
        branch,
        passingYear,
        city,
        country,
        location:{
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
    };

    if(req.file){
        updateData.photo = `uploads/alumni/profile/${req.file.filename}`;
    }

    let profile = await AlumniProfile.findOne({ user: userId });

    if(profile){
        // Update
        profile = await AlumniProfile.findOneAndUpdate(
            { user: userId},
            { $set: updateData},
            { new: true }
        );
    }else{
        // Create
        profile = new AlumniProfile({
            user: userId,
            alumniId: alumniId,
            ...updateData,
        });
        await profile.save();
        await User.findByIdAndUpdate(userId, {
            alumniProfile: profile.alumniId,
        });
    }
    res.status(201).json({ message: "Profile Completed", alumniId});
}

exports.getAlumniUserById = async(req, res) => {
   const userId = req.params.id
    const objectId = new mongoose.Types.ObjectId(userId); // ensure it's ObjectId
    try{
        const AlumniUserData = await User.aggregate([
            {
                $match: { _id: objectId }
            },
            {
                $lookup: {
                    from: "alumniprofiles",
                    localField: "_id",
                    foreignField: "user",
                    as: "alumniprofiles"
                }
            },
            {
                $project: {
                    first_name: 1,
                    last_name: 1,
                    email: 1,
                    alumniprofiles: 1,
                }
            }
        ]);
        return res.status(200).json({ success: true, AlumniUserData});
    }catch(err){
        console.error("Error Fetching Alumni User",err);
        return res.status(500).json({ success: false, message: "Server Error"});
    }
}
