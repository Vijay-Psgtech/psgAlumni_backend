const mongoose = require('mongoose');

const counterSchema  = ({
    key: { type: String, required: true, unqiue: true },
    seq: { type: Number, default: 0 },
});

module.exports = mongoose.model("Counter", counterSchema);