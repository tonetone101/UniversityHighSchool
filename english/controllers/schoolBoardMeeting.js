const SchoolBoardMeeting = require('../models/schoolBoardMeetings');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.schoolBoardMeetingById = (req, res, next, id) => {
    SchoolBoardMeeting.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title date time where body url docUrl created photo')
        .exec((err, schoolBoardMeeting) => {
            if (err || !schoolBoardMeeting) {
                return res.status(400).json({
                    error: err
                });
            }
            req.schoolBoardMeeting = schoolBoardMeeting;
            next();
        });
};


exports.getschoolBoardMeetings = (req, res, next) => { 
    const schoolBoardMeetings = SchoolBoardMeeting.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title date time where body url docUrl created photo")
        .sort({ created: -1 })
        .then(schoolBoardMeetings => {
           res.json(schoolBoardMeetings)
        })
        .catch(err => console.log(err));
      
};

exports.createschoolBoardMeeting = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let schoolBoardMeeting = new SchoolBoardMeeting(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        schoolBoardMeeting.postedBy = req.profile;
        if (files.photo) {
            schoolBoardMeeting.photo.data = fs.readFileSync(files.photo.path);
            schoolBoardMeeting.photo.contentType = files.photo.type;
        }
        schoolBoardMeeting.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.schoolBoardMeetingsByUser = (req, res) => {
    SchoolBoardMeeting.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where url docUrl photo created')
        .sort('_created')
        .exec((err, schoolBoardMeetings) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(schoolBoardMeetings);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.schoolBoardMeeting && req.auth && req.schoolBoardMeeting.postedBy._id == req.auth._id;
    let adminUser = req.schoolBoardMeeting && req.auth && req.auth.role === 'admin';

    console.log("req.schoolBoardMeeting ", req.schoolBoardMeeting, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updateschoolBoardMeeting = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let schoolBoardMeeting = req.schoolBoardMeeting;
        schoolBoardMeeting = _.extend(schoolBoardMeeting, fields);
        schoolBoardMeeting.updated = Date.now();

        if (files.photo) {
            schoolBoardMeeting.photo.data = fs.readFileSync(files.photo.path);
            schoolBoardMeeting.photo.contentType = files.photo.type;
        }

        schoolBoardMeeting.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(schoolBoardMeeting);
        });
    });
};

exports.deleteschoolBoardMeeting = (req, res) => {
    let schoolBoardMeeting = req.schoolBoardMeeting;
    schoolBoardMeeting.remove((err, schoolBoardMeeting) => {
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
    res.set('Content-Type', req.schoolBoardMeeting.photo.contentType);
    return res.send(req.schoolBoardMeeting.photo.data);
};

exports.singleschoolBoardMeeting = (req, res) => {
    return res.json(req.schoolBoardMeeting);
};



