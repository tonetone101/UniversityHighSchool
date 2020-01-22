const Application = require('../models/application');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getapplication = (req, res, next) => {
   
    const application = Application.find()
        .select("_id name photo created")
        .sort({ created: -1 })
        .then(application => {
           res.json(application)
        })
        .catch(err => console.log(err));
      
};

exports.applicationById = (req, res, next, id) => {
    Application.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id name created photo')
        .exec((err, application) => {
            if (err || !application) {
                return res.status(400).json({
                    error: err
                });
            }
            req.application = application;
            next();
        });
};

exports.createapplication = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let application = new Application(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        application.postedBy = req.profile;
        if (files.photo) {
            application.photo.data = fs.readFileSync(files.photo.path);
            application.photo.contentType = files.photo.type;
        }
        application.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateapplication = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let application = req.application;
        application = _.extend(application, fields);
        application.updated = Date.now();

        if (files.photo) {
            application.photo.data = fs.readFileSync(files.photo.path);
            application.photo.contentType = files.photo.type;
        }

        application.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(application);
        });
    });
};

exports.deleteapplication = (req, res) => {
    let application = req.application;
    application.remove((err, application) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'application deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.application.photo.contentType);
    return res.send(req.application.photo.data);
};

exports.singleapplication = (req, res) => {
    return res.json(req.application);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.application && req.auth && req.application.postedBy._id == req.auth._id;
    let adminUser = req.application && req.auth && req.auth.role === 'admin';

    console.log("req.application ", req.application, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};