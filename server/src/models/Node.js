const mongoose = require('mongoose');

const nodeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    gender: String,
    children: Array,
    parents: Array,
    spouses: Array,
    siblings: Array,
    blurb: String
});

module.exports = mongoose.model('Node', nodeSchema)