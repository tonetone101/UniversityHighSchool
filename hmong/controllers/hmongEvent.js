const hmongEvent = require('../models/hmongEvents');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.hmongEventById = (req, res, next, id) => {
    HmongEvent.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title date time where body created photo')
        .exec((err, hmongEvent) => {
            if (err || !hmongEvent) {
                return res.status(400).json({
                    error: err
                });
            }
            req.hmongEvent = hmongEvent;
            next();
        });
};


exports.gethmongEvents = (req, res, next) => { 
    const hmongEvents = HmongEvent.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title date time where body created photo")
        .sort({ created: -1 })
        .then(hmongEvents => {
           res.json(hmongEvents)
        })
        .catch(err => console.log(err));
      
};

exports.createhmongEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let hmongEvent = new HmongEvent(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        hmongEvent.postedBy = req.profile;
        if (files.photo) {
            hmongEvent.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            hmongEvent.photo.contentType = files.photo.type;
        }
        hmongEvent.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.hmongEventsByUser = (req, res) => {
    hmongEvent.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where photo created')
        .sort('_created')
        .exec((err, hmongEvents) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(hmongEvents);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.hmongEvent && req.auth && req.hmongEvent.postedBy._id == req.auth._id;
    let adminUser = req.hmongEvent && req.auth && req.auth.role === 'admin';

    console.log("req.hmongEvent ", req.hmongEvent, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updatehmongEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let hmongEvent = req.hmongEvent;
        hmongEvent = _.extend(hmongEvent, fields);
        hmongEvent.updated = Date.now();

        if (files.photo) {
            hmongEvent.photo.data = fs.readFileSync(files.photo.path);
            hmongEvent.photo.contentType = files.photo.type;
        }

        hmongEvent.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(hmongEvent);
        });
    });
};

exports.deletehmongEvent = (req, res) => {
    let hmongEvent = req.hmongEvent;
    hmongEvent.remove((err, hmongEvent) => {
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
    res.set('Content-Type', req.hmongEvent.photo.contentType);
    return res.send(req.hmongEvent.photo.data);
};

exports.singlehmongEvent = (req, res) => {
    return res.json(req.hmongEvent);
};



