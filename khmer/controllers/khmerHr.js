const KhmerHr = require('../models/khmerHr');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.hrById = (req, res, next, id) => {
    KhmerHr.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title url docUrl created photo update')
        .exec((err, hr) => {
            if (err || !hr) {
                return res.status(400).json({
                    error: err
                });
            }
            req.hr = hr;
            next();
        });
};


exports.gethrs = (req, res, next) => { 
    const hrs = KhmerHr.find()
        .populate("postedBy", "_id name photo role")
        .select("_id title url docUrl created photo update")
        .sort({ created: -1 })
        .then(hrs => {
           res.json(hrs)
        })
        .catch(err => console.log(err));
      
};

exports.createhr = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let hr = new KhmerHr(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        hr.postedBy = req.profile;
        if (files.photo) {
            hr.photo.data = fs.readFileSync(files.photo.path);
            hr.photo.contentType = files.photo.type;
        }
        hr.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.hrsByUser = (req, res) => {
    KhmerHr.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id title time date where url photo created update')
        .sort('_created')
        .exec((err, hrs) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(hrs);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.hr && req.auth && req.hr.postedBy._id == req.auth._id;
    let adminUser = req.hr && req.auth && req.auth.role === 'admin';

    console.log("req.hr ", req.hr, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updatehr = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let hr = req.hr;
        hr = _.extend(hr, fields);
        hr.updated = Date.now();

        if (files.photo) {
            hr.photo.data = fs.readFileSync(files.photo.path);
            hr.photo.contentType = files.photo.type;
        }

        hr.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(hr);
        });
    });
};

exports.deletehr = (req, res) => {
    let hr = req.hr;
    hr.remove((err, hr) => {
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
    res.set('Content-Type', req.hr.photo.contentType);
    return res.send(req.hr.photo.data);
};

exports.singlehr = (req, res) => {
    return res.json(req.hr);
};



