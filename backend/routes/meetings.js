const express = require('express');
const Meeting = require('../models/meeting');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const meetings = await Meeting.find();
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { title, date, duration, participants, notes } = req.body;
    const newMeeting = new Meeting({ title, date, duration, participants, notes });

    try {
        const savedMeeting = await newMeeting.save();
        res.status(201).json(savedMeeting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const meeting = await Meeting.findByIdAndDelete(id);
        res.status(200).json(meeting);
        console.log('meeting deleted');
    } catch (e) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;