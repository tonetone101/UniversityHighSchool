const PortApplication = require('../models/portApplication');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getportapplication = (req, res, next) => {
   
    const portapplication = PortApplication.find()
        .select("_id name photo created")
        .sort({ created: -1 })
        .then(portapplication => {
           res.json(portapplication)
        })
        .catch(err => console.log(err));
      
};

exports.portapplicationById = (req, res, next, id) => {
    PortApplication.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id name created photo')
        .exec((err, portapplication) => {
            if (err || !portapplication) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portapplication = portapplication;
            next();
        });
};

exports.createportapplication = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let portapplication = new PortApplication(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portapplication.postedBy = req.profile;
        if (files.photo) {
            portapplication.photo.data = fs.readFileSync(files.photo.path);
            portapplication.photo.contentType = files.photo.type;
        }
        portapplication.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateportapplication = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let portapplication = req.portapplication;
        portapplication = _.extend(portapplication, fields);
        portapplication.updated = Date.now();

        if (files.photo) {
            portapplication.photo.data = fs.readFileSync(files.photo.path);
            portapplication.photo.contentType = files.photo.type;
        }

        portapplication.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portapplication);
        });
    });
};

exports.deleteportapplication = (req, res) => {
    let portapplication = req.portapplication;
    portapplication.remove((err, portapplication) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'portapplication deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.portapplication.photo.contentType);
    return res.send(req.portapplication.photo.data);
};

exports.singleportapplication = (req, res) => {
    return res.json(req.portapplication);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.portapplication && req.auth && req.portapplication.postedBy._id == req.auth._id;
    let adminUser = req.portapplication && req.auth && req.auth.role === 'admin';

    console.log("req.portapplication ", req.portapplication, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};