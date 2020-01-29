const PortSchoolBoardMeeting = require('../models/portschoolBoardMeetings');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.portschoolBoardMeetingById = (req, res, next, id) => {
    PortSchoolBoardMeeting.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title date time where body url docUrl created photo')
        .exec((err, portschoolBoardMeeting) => {
            if (err || !portschoolBoardMeeting) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portschoolBoardMeeting = portschoolBoardMeeting;
            next();
        });
};


exports.getportschoolBoardMeetings = (req, res, next) => { 
    const portschoolBoardMeetings = PortSchoolBoardMeeting.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title date time where body url docUrl created photo")
        .sort({ created: -1 })
        .then(portschoolBoardMeetings => {
           res.json(portschoolBoardMeetings)
        })
        .catch(err => console.log(err));
      
};

exports.createportschoolBoardMeeting = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let portschoolBoardMeeting = new PortSchoolBoardMeeting(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portschoolBoardMeeting.postedBy = req.profile;
        if (files.photo) {
            portschoolBoardMeeting.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            portschoolBoardMeeting.photo.contentType = files.photo.type;
        }
        portschoolBoardMeeting.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.portschoolBoardMeetingsByUser = (req, res) => {
    PortSchoolBoardMeeting.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where url docUrl photo created')
        .sort('_created')
        .exec((err, portschoolBoardMeetings) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portschoolBoardMeetings);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.portschoolBoardMeeting && req.auth && req.portschoolBoardMeeting.postedBy._id == req.auth._id;
    let adminUser = req.portschoolBoardMeeting && req.auth && req.auth.role === 'admin';

    console.log("req.portschoolBoardMeeting ", req.portschoolBoardMeeting, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updateportschoolBoardMeeting = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let portschoolBoardMeeting = req.portschoolBoardMeeting;
        portschoolBoardMeeting = _.extend(portschoolBoardMeeting, fields);
        portschoolBoardMeeting.updated = Date.now();

        if (files.photo) {
            portschoolBoardMeeting.photo.data = fs.readFileSync(files.photo.path);
            portschoolBoardMeeting.photo.contentType = files.photo.type;
        }

        portschoolBoardMeeting.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portschoolBoardMeeting);
        });
    });
};

exports.deleteportschoolBoardMeeting = (req, res) => {
    let portschoolBoardMeeting = req.portschoolBoardMeeting;
    portschoolBoardMeeting.remove((err, portschoolBoardMeeting) => {
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
    res.set('Content-Type', req.portschoolBoardMeeting.photo.contentType);
    return res.send(req.portschoolBoardMeeting.photo.data);
};

exports.singleportschoolBoardMeeting = (req, res) => {
    return res.json(req.portschoolBoardMeeting);
};



