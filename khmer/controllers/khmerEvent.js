const KhmerEvent = require('../models/khmerEvents');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.khmerEventById = (req, res, next, id) => {
    KhmerEvent.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title date time where body created photo')
        .exec((err, khmerEvent) => {
            if (err || !khmerEvent) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerEvent = khmerEvent;
            next();
        });
};


exports.getkhmerEvents = (req, res, next) => { 
    const khmerEvents = KhmerEvent.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title date time where body created photo")
        .sort({ created: -1 })
        .then(khmerEvents => {
           res.json(khmerEvents)
        })
        .catch(err => console.log(err));
      
};

exports.createkhmerEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let khmerEvent = new KhmerEvent(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmerEvent.postedBy = req.profile;
        if (files.photo) {
            khmerEvent.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            khmerEvent.photo.contentType = files.photo.type;
        }
        khmerEvent.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.khmerEventsByUser = (req, res) => {
    KhmerEvent.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where photo created')
        .sort('_created')
        .exec((err, khmerEvents) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerEvents);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.khmerEvent && req.auth && req.khmerEvent.postedBy._id == req.auth._id;
    let adminUser = req.khmerEvent && req.auth && req.auth.role === 'admin';

    console.log("req.khmerEvent ", req.khmerEvent, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updatekhmerEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let khmerEvent = req.khmerEvent;
        khmerEvent = _.extend(khmerEvent, fields);
        khmerEvent.updated = Date.now();

        if (files.photo) {
            khmerEvent.photo.data = fs.readFileSync(files.photo.path);
            khmerEvent.photo.contentType = files.photo.type;
        }

        khmerEvent.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerEvent);
        });
    });
};

exports.deletekhmerEvent = (req, res) => {
    let khmerEvent = req.khmerEvent;
    khmerEvent.remove((err, khmerEvent) => {
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
    res.set('Content-Type', req.khmerEvent.photo.contentType);
    return res.send(req.khmerEvent.photo.data);
};

exports.singlekhmerEvent = (req, res) => {
    return res.json(req.khmerEvent);
};



