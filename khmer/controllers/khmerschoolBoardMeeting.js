const KhmerSchoolBoardMeeting = require('../models/KhmerschoolBoardMeetings');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.khmerschoolBoardMeetingById = (req, res, next, id) => {
    KhmerSchoolBoardMeeting.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title date time where body url docUrl created photo')
        .exec((err, khmerschoolBoardMeeting) => {
            if (err || !khmerschoolBoardMeeting) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerschoolBoardMeeting = khmerschoolBoardMeeting;
            next();
        });
};


exports.getkhmerschoolBoardMeetings = (req, res, next) => { 
    const khmerschoolBoardMeetings = KhmerSchoolBoardMeeting.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title date time where body url docUrl created photo")
        .sort({ created: -1 })
        .then(khmerschoolBoardMeetings => {
           res.json(khmerschoolBoardMeetings)
        })
        .catch(err => console.log(err));
      
};

exports.createkhmerschoolBoardMeeting = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let khmerschoolBoardMeeting = new KhmerSchoolBoardMeeting(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmerschoolBoardMeeting.postedBy = req.profile;
        if (files.photo) {
            khmerschoolBoardMeeting.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            khmerschoolBoardMeeting.photo.contentType = files.photo.type;
        }
        khmerschoolBoardMeeting.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.khmerschoolBoardMeetingsByUser = (req, res) => {
    KhmerSchoolBoardMeeting.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where url docUrl photo created')
        .sort('_created')
        .exec((err, khmerschoolBoardMeetings) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerschoolBoardMeetings);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.khmerschoolBoardMeeting && req.auth && req.khmerschoolBoardMeeting.postedBy._id == req.auth._id;
    let adminUser = req.khmerschoolBoardMeeting && req.auth && req.auth.role === 'admin';

    console.log("req.khmerschoolBoardMeeting ", req.khmerschoolBoardMeeting, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updatekhmerschoolBoardMeeting = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let khmerschoolBoardMeeting = req.khmerschoolBoardMeeting;
        khmerschoolBoardMeeting = _.extend(khmerschoolBoardMeeting, fields);
        khmerschoolBoardMeeting.updated = Date.now();

        if (files.photo) {
            khmerschoolBoardMeeting.photo.data = fs.readFileSync(files.photo.path);
            khmerschoolBoardMeeting.photo.contentType = files.photo.type;
        }

        khmerschoolBoardMeeting.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerschoolBoardMeeting);
        });
    });
};

exports.deletekhmerschoolBoardMeeting = (req, res) => {
    let khmerschoolBoardMeeting = req.khmerschoolBoardMeeting;
    khmerschoolBoardMeeting.remove((err, khmerschoolBoardMeeting) => {
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
    res.set('Content-Type', req.khmerschoolBoardMeeting.photo.contentType);
    return res.send(req.khmerschoolBoardMeeting.photo.data);
};

exports.singlekhmerschoolBoardMeeting = (req, res) => {
    return res.json(req.khmerschoolBoardMeeting);
};



