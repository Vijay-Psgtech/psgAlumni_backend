const mongoose = require('mongoose');

const alumniProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  batch: { type: String, required: true },         
  branch: { type: String, required: true },        
  passingYear : { type: String },  
  city: { type: String },                 
  country: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number], // [longitude, latitude]
  },
  photo: { type: String },
  occupation: { type: String },
  company: { type: String },
  bio: { type: String },
  linkedIn: { type: String },
  alumniId: {
    type: String,
    unique: true,
    required: true
  }
}, { timestamps: true });

alumniProfileSchema.index({ location: '2dsphere' });

alumniProfileSchema.index({ batch: 1 });
alumniProfileSchema.index({ branch: 1 });
alumniProfileSchema.index({ country: 1 });

module.exports = mongoose.model('AlumniProfile', alumniProfileSchema);