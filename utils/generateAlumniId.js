const Counter = require('../models/Counter');

async function getNextAlumniId(year){
    const key = `alumni-${year}`;
    const counter = await Counter.findOneAndUpdate(
        { key },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    const paddedSeq = String(counter.seq).padStart(4, '0');
    return `PSGALUM${year}${paddedSeq}`;
}

module.exports = getNextAlumniId;