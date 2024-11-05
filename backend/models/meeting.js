const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    duration: String,
    participants: String,
    notes: String,
});

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;