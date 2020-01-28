const PortAbout = require('../models/portAbout');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.portaboutById = (req, res, next, id) => {
    PortAbout.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id body paragraph2 paragraph3 paragraph4 paragraph5 url created photo')
        .exec((err, portabout) => {
            if (err || !portabout) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portabout = portabout;
            next();
        });
};


exports.getportabouts = (req, res, next) => { 
    const portabouts = PortAbout.find()
        .populate("postedBy", "_id name photo role")
        .select("_id body paragraph2 paragraph3 paragraph4 paragraph5 url created photo")
        .sort({ created: -1 })
        .then(portabouts => {
           res.json(portabouts)
        })
        .catch(err => console.log(err));
      
};

exports.createportabout = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let portabout = new PortAbout(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portabout.postedBy = req.profile;
        if (files.photo) {
            portabout.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            portabout.photo.contentType = files.photo.type;
        }
        portabout.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.portaboutsByUser = (req, res) => {
    PortAbout.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id body paragraph2 paragraph3 paragraph4 paragraph5 url photo created')
        .sort('_created')
        .exec((err, portabouts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portabouts);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.portabout && req.auth && req.portabout.postedBy._id == req.auth._id;
    let adminUser = req.portabout && req.auth && req.auth.role === 'admin';

    console.log("req.portabout ", req.portabout, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updateportabout = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let portabout = req.portabout;
        portabout = _.extend(portabout, fields);
        portabout.updated = Date.now();

        if (files.photo) {
            portabout.photo.data = fs.readFileSync(files.photo.path);
            portabout.photo.contentType = files.photo.type;
        }

        portabout.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portabout);
        });
    });
};

exports.deleteportabout = (req, res) => {
    let portabout = req.portabout;
    portabout.remove((err, portabout) => {
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
    res.set('Content-Type', req.portabout.photo.contentType);
    return res.send(req.portabout.photo.data);
};

exports.singleportabout = (req, res) => {
    return res.json(req.portabout);
};



