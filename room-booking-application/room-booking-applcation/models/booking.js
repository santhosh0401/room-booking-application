const mongoose = require('mongoose');

const roomBookSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
        },

        phoneNo: {
            type: String,
            required: true,
        },

        roomBooked: {
            type: String,
            required: true,
        },

        noOfDaysBooked: {
            type: String,
            required: true,
        }
    }
);

const RoomBook = mongoose.model('RoomBook',roomBookSchema);

module.exports = RoomBook;