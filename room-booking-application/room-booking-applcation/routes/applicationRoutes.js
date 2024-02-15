const express = require('express');
const router = express.Router();

const Room = require('../models/room.js');
const RoomBook = require('../models/booking.js');


router.get('/main', (req,res) => 
{
    res.render('main');
});

router.get('/new-room', (req,res) => 
{
    res.render('createRoom');
});

router.post('/new-room', (req,res) => 
{
    console.log(req.body.roomNo,req.body.roomType); 
    const doc = {
        roomNo: req.body.roomNo,
        roomType: req.body.roomType,
    }
    Room.create(doc)
    .then(room => res.render('new-room'))
    .catch(err => res.status(400).json({error:'cant create room'}));
});

router.get('/book-room', (req,res) => 
{
    res.render('bookRoom');
});

router.post('/book-room', (req,res) => {
    console.log(req.body);
    const doc = {
        name: req.body.name,
        phoneNo: req.body.phone,
        roomBooked: req.body.room_number,
        noOfDaysBooked: req.body.days_booked,
    };
    Room.findOne({ roomNo: req.body.room_number})
    .then(
        recDoc => {
            console.log(recDoc)
            if (recDoc.isBooked == false) {
                RoomBook.create(doc)
                .then(room => Room.findOneAndUpdate({roomNo: recDoc.roomNo},{isBooked: true}))
                .then(room => res.render('new-room'))
                .catch(err => res.status(400).json({error:'cant add note'}));
                
            }    
            else {
                res.send('room already booked');
                
            }    
        }
    )
    
});

router.get('/view-room', async (req,res) => 
{
    const bookings = await Room.find({
        isBooked: {
          $eq: false,
        },
      });

    res.render('viewRooms',{ bookings });
});



module.exports = router;