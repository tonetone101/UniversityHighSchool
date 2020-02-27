const Academics = require('../models/academics');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.academicsById = (req, res, next, id) => {
    Academics.findById(id)
        .populate("uploadedBy", "_id name")
        .populate("uploadedBy", "_id name role")
        .select('_id intro paragraph1 paragraph2 paragraph3 paragraph4 grade9Expect grade9Curric  grade10Expect grade10Curric grade11Expect grade11Curric grade12Expect grade12Curric created photo')
        .exec((err, academics) => {
            if (err || !academics) {
                return res.status(400).json({
                    error: err
                });
            }
            req.academics = academics;
            next();
        });
};

exports.createacademics = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let academics = new Academics(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        academics.postedBy = req.profile;
        if (files.photo) {
            academics.photo.data = fs.readFileSync(files.photo.path);
            academics.photo.contentType = files.photo.type;
        }
        academics.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.getacademicss = (req, res) => {
    const academicss = Academics.find()
        .populate("uploadedBy", "_id name photo group")
        .populate('comments', '_id text created')
        .select("_id intro paragraph1 paragraph2 paragraph3 paragraph4 grade9Expect grade9Curric  grade10Expect grade10Curric grade11Expect grade11Curric grade12Expect grade12Curric")
        .sort({ created: -1 })
        .then(academicss => {
            res.json(academicss);
        })
        .catch(err => console.log(err));
};

exports.academicsByUser = (req, res) => {
    Academics.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id comments created')
        .sort('_created')
        .exec((err, academicss) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(academicss);
        });
};

exports.updateacademics = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let academics = req.academics;
        academics = _.extend(academics, fields);
        academics.updated = Date.now();

        if (files.photo) {
            academics.photo.data = fs.readFileSync(files.photo.path);
            academics.photo.contentType = files.photo.type;
        }

        academics.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(academics);
        });
    });
};

exports.deleteacademics = (req, res) => {
    let academics = req.academics;
    academics.remove((err, academics) => {
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

exports.isAdmin = (req, res, next) => {
    let sameUser = req.academics && req.auth && req.academics.postedBy._id == req.auth._id;
    let adminUser = req.academics && req.auth && req.auth.role === 'admin';

    console.log("req.academics ", req.academics, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.singleacademics = (req, res) => {
    return res.json(req.academics);
};



