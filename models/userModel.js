const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: ['admin', 'alumni'],
        default: 'alumni'
    },
    alumniProfile: { type:mongoose.Schema.Types.ObjectId, ref: 'AlumniProfile' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',userSchema);