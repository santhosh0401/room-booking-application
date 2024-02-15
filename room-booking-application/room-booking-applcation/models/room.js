const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        roomNo: {
            type: String,
            required: true,
        },

        roomType: {
            type: String,
            required: true,
        },

        isBooked: {
            type: Boolean,
            required: true,
            default: false,
        }


    }
);

const Room = mongoose.model('Room',roomSchema);

module.exports = Room;