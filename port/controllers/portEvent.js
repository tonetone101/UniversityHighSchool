const portEvent = require('../models/portEvents');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.portEventById = (req, res, next, id) => {
    PortEvent.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title date time where body created photo')
        .exec((err, portEvent) => {
            if (err || !portEvent) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portEvent = portEvent;
            next();
        });
};


exports.getportEvents = (req, res, next) => { 
    const portEvents = PortEvent.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title date time where body created photo")
        .sort({ created: -1 })
        .then(portEvents => {
           res.json(portEvents)
        })
        .catch(err => console.log(err));
      
};

exports.createportEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let portEvent = new PortEvent(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portEvent.postedBy = req.profile;
        if (files.photo) {
            portEvent.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            portEvent.photo.contentType = files.photo.type;
        }
        portEvent.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.portEventsByUser = (req, res) => {
    portEvent.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where photo created')
        .sort('_created')
        .exec((err, portEvents) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portEvents);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.portEvent && req.auth && req.portEvent.postedBy._id == req.auth._id;
    let adminUser = req.portEvent && req.auth && req.auth.role === 'admin';

    console.log("req.portEvent ", req.portEvent, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updateportEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let portEvent = req.portEvent;
        portEvent = _.extend(portEvent, fields);
        portEvent.updated = Date.now();

        if (files.photo) {
            portEvent.photo.data = fs.readFileSync(files.photo.path);
            portEvent.photo.contentType = files.photo.type;
        }

        portEvent.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portEvent);
        });
    });
};

exports.deleteportEvent = (req, res) => {
    let portEvent = req.portEvent;
    portEvent.remove((err, portEvent) => {
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
    res.set('Content-Type', req.portEvent.photo.contentType);
    return res.send(req.portEvent.photo.data);
};

exports.singleportEvent = (req, res) => {
    return res.json(req.portEvent);
};



