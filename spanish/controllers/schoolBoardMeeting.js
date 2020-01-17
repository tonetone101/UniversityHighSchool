const SpanishSchoolBoardMeeting = require('../models/spanishschoolBoardMeetings');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.spanishschoolBoardMeetingById = (req, res, next, id) => {
    SpanishSchoolBoardMeeting.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title date time where body url docUrl created photo')
        .exec((err, spanishschoolBoardMeeting) => {
            if (err || !spanishschoolBoardMeeting) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishschoolBoardMeeting = spanishschoolBoardMeeting;
            next();
        });
};


exports.getspanishschoolBoardMeetings = (req, res, next) => { 
    const spanishschoolBoardMeetings = SpanishSchoolBoardMeeting.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title date time where body url docUrl created photo")
        .sort({ created: -1 })
        .then(spanishschoolBoardMeetings => {
           res.json(spanishschoolBoardMeetings)
        })
        .catch(err => console.log(err));
      
};

exports.createspanishschoolBoardMeeting = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let spanishschoolBoardMeeting = new SpanishSchoolBoardMeeting(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishschoolBoardMeeting.postedBy = req.profile;
        if (files.photo) {
            spanishschoolBoardMeeting.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            spanishschoolBoardMeeting.photo.contentType = files.photo.type;
        }
        spanishschoolBoardMeeting.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.spanishschoolBoardMeetingsByUser = (req, res) => {
    spanishSchoolBoardMeeting.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where url docUrl photo created')
        .sort('_created')
        .exec((err, spanishschoolBoardMeetings) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishschoolBoardMeetings);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.spanishschoolBoardMeeting && req.auth && req.spanishschoolBoardMeeting.postedBy._id == req.auth._id;
    let adminUser = req.spanishschoolBoardMeeting && req.auth && req.auth.role === 'admin';

    console.log("req.spanishschoolBoardMeeting ", req.spanishschoolBoardMeeting, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updatespanishschoolBoardMeeting = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let spanishschoolBoardMeeting = req.spanishschoolBoardMeeting;
        spanishschoolBoardMeeting = _.extend(spanishschoolBoardMeeting, fields);
        spanishschoolBoardMeeting.updated = Date.now();

        if (files.photo) {
            spanishschoolBoardMeeting.photo.data = fs.readFileSync(files.photo.path);
            spanishschoolBoardMeeting.photo.contentType = files.photo.type;
        }

        spanishschoolBoardMeeting.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishschoolBoardMeeting);
        });
    });
};

exports.deletespanishschoolBoardMeeting = (req, res) => {
    let spanishschoolBoardMeeting = req.spanishschoolBoardMeeting;
    spanishschoolBoardMeeting.remove((err, spanishschoolBoardMeeting) => {
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
    res.set('Content-Type', req.spanishschoolBoardMeeting.photo.contentType);
    return res.send(req.spanishschoolBoardMeeting.photo.data);
};

exports.singlespanishschoolBoardMeeting = (req, res) => {
    return res.json(req.spanishschoolBoardMeeting);
};



