const Event = require('../models/events');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.eventById = (req, res, next, id) => {
    Event.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title date time where body url created photo')
        .exec((err, event) => {
            if (err || !event) {
                return res.status(400).json({
                    error: err
                });
            }
            req.event = event;
            next();
        });
};


exports.getEvents = (req, res, next) => { 
    const events = Event.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title date time where body url created photo")
        .sort({ created: -1 })
        .then(events => {
           res.json(events)
        })
        .catch(err => console.log(err));
      
};

exports.createEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let event = new Event(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        event.postedBy = req.profile;
        if (files.photo) {
            event.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            event.photo.contentType = files.photo.type;
        }
        event.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.eventsByUser = (req, res) => {
    Event.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where url photo created')
        .sort('_created')
        .exec((err, events) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(events);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.event && req.auth && req.event.postedBy._id == req.auth._id;
    let adminUser = req.event && req.auth && req.auth.role === 'admin';

    console.log("req.event ", req.event, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updateEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let event = req.event;
        event = _.extend(event, fields);
        event.updated = Date.now();

        if (files.photo) {
            event.photo.data = fs.readFileSync(files.photo.path);
            event.photo.contentType = files.photo.type;
        }

        event.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(event);
        });
    });
};

exports.deleteEvent = (req, res) => {
    let event = req.event;
    event.remove((err, event) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Post deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.event.photo.contentType);
    return res.send(req.event.photo.data);
};

exports.singleEvent = (req, res) => {
    return res.json(req.event);
};



