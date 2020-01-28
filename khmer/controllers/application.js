const KhmerApplication = require('../models/application');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getkhmerapplication = (req, res, next) => {
   
    const khmerapplication = KhmerApplication.find()
        .select("_id name photo created")
        .sort({ created: -1 })
        .then(khmerapplication => {
           res.json(khmerapplication)
        })
        .catch(err => console.log(err));
      
};

exports.khmerapplicationById = (req, res, next, id) => {
    KhmerApplication.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id name created photo')
        .exec((err, khmerapplication) => {
            if (err || !khmerapplication) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerapplication = khmerapplication;
            next();
        });
};

exports.createkhmerapplication = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let khmerapplication = new KhmerApplication(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmerapplication.postedBy = req.profile;
        if (files.photo) {
            khmerapplication.photo.data = fs.readFileSync(files.photo.path);
            khmerapplication.photo.contentType = files.photo.type;
        }
        khmerapplication.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatekhmerapplication = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let khmerapplication = req.khmerapplication;
        khmerapplication = _.extend(khmerapplication, fields);
        khmerapplication.updated = Date.now();

        if (files.photo) {
            khmerapplication.photo.data = fs.readFileSync(files.photo.path);
            khmerapplication.photo.contentType = files.photo.type;
        }

        khmerapplication.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerapplication);
        });
    });
};

exports.deletekhmerapplication = (req, res) => {
    let khmerapplication = req.khmerapplication;
    khmerapplication.remove((err, khmerapplication) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'khmerapplication deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.khmerapplication.photo.contentType);
    return res.send(req.khmerapplication.photo.data);
};

exports.singlekhmerapplication = (req, res) => {
    return res.json(req.khmerapplication);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.khmerapplication && req.auth && req.khmerapplication.postedBy._id == req.auth._id;
    let adminUser = req.khmerapplication && req.auth && req.auth.role === 'admin';

    console.log("req.khmerapplication ", req.khmerapplication, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};