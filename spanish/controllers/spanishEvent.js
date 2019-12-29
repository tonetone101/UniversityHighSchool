const SpanishEvent = require('../models/spanishEvents');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.spanishEventById = (req, res, next, id) => {
    SpanishEvent.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title date time where body created photo')
        .exec((err, spanishEvent) => {
            if (err || !spanishEvent) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishEvent = spanishEvent;
            next();
        });
};


exports.getspanishEvents = (req, res, next) => { 
    const spanishEvents = SpanishEvent.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title date time where body created photo")
        .sort({ created: -1 })
        .then(spanishEvents => {
           res.json(spanishEvents)
        })
        .catch(err => console.log(err));
      
};

exports.createspanishEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let spanishEvent = new SpanishEvent(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishEvent.postedBy = req.profile;
        if (files.photo) {
            spanishEvent.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            spanishEvent.photo.contentType = files.photo.type;
        }
        spanishEvent.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.spanishEventsByUser = (req, res) => {
    spanishEvent.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where photo created')
        .sort('_created')
        .exec((err, spanishEvents) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishEvents);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.spanishEvent && req.auth && req.spanishEvent.postedBy._id == req.auth._id;
    let adminUser = req.spanishEvent && req.auth && req.auth.role === 'admin';

    console.log("req.spanishEvent ", req.spanishEvent, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updatespanishEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let spanishEvent = req.spanishEvent;
        spanishEvent = _.extend(spanishEvent, fields);
        spanishEvent.updated = Date.now();

        if (files.photo) {
            spanishEvent.photo.data = fs.readFileSync(files.photo.path);
            spanishEvent.photo.contentType = files.photo.type;
        }

        spanishEvent.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishEvent);
        });
    });
};

exports.deletespanishEvent = (req, res) => {
    let spanishEvent = req.spanishEvent;
    spanishEvent.remove((err, spanishEvent) => {
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
    res.set('Content-Type', req.spanishEvent.photo.contentType);
    return res.send(req.spanishEvent.photo.data);
};

exports.singlespanishEvent = (req, res) => {
    return res.json(req.spanishEvent);
};



