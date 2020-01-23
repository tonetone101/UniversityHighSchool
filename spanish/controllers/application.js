const SpanishApplication = require('../models/application');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.gespanishtapplication = (req, res, next) => {
   
    const spanishapplication = SpanishApplication.find()
        .select("_id name photo created")
        .sort({ created: -1 })
        .then(spanishapplication => {
           res.json(spanishapplication)
        })
        .catch(err => console.log(err));
      
};

exports.spanishapplicationById = (req, res, next, id) => {
    SpanishApplication.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id name created photo')
        .exec((err, spanishapplication) => {
            if (err || !spanishapplication) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishapplication = spanishapplication;
            next();
        });
};

exports.createspanishapplication = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let spanishapplication = new SpanishApplication(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishapplication.postedBy = req.profile;
        if (files.photo) {
            spanishapplication.photo.data = fs.readFileSync(files.photo.path);
            spanishapplication.photo.contentType = files.photo.type;
        }
        spanishapplication.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatespanishapplication = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let spanishapplication = req.spanishapplication;
        spanishapplication = _.extend(spanishapplication, fields);
        spanishapplication.updated = Date.now();

        if (files.photo) {
            spanishapplication.photo.data = fs.readFileSync(files.photo.path);
            spanishapplication.photo.contentType = files.photo.type;
        }

        spanishapplication.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishapplication);
        });
    });
};

exports.deletespanishapplication = (req, res) => {
    let spanishapplication = req.spanishapplication;
    spanishapplication.remove((err, spanishapplication) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'spanishapplication deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.spanishapplication.photo.contentType);
    return res.send(req.spanishapplication.photo.data);
};

exports.singlespanishapplication = (req, res) => {
    return res.json(req.spanishapplication);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.spanishapplication && req.auth && req.spanishapplication.postedBy._id == req.auth._id;
    let adminUser = req.spanishapplication && req.auth && req.auth.role === 'admin';

    console.log("req.spanishapplication ", req.spanishapplication, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};