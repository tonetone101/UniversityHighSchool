const KhmerAdmission = require('../models/admission');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.khmeradmissionById = (req, res, next, id) => {
    KhmerAdmission.findById(id)
        .populate("uploadedBy", "_id name")
        .populate("comments.uploadedBy", "_id name")
        .populate("uploadedBy", "_id name role")
        .select('_id title comments created photo')
        .exec((err, khmeradmission) => {
            if (err || !khmeradmission) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmeradmission = khmeradmission;
            next();
        });
};

exports.createkhmeradmission = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let khmeradmission = new KhmerAdmission(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmeradmission.postedBy = req.profile;
        if (files.photo) {
            khmeradmission.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            khmeradmission.photo.contentType = files.photo.type;
        }
        khmeradmission.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.getkhmerAdmissions = (req, res) => {
    const khmeradmissions = KhmerAdmission.find()
        .populate("uploadedBy", "_id name photo group")
        .populate('comments', '_id text created')
        .populate("comments.uploadedBy", "_id name")
        .select("_id title comments")
        .sort({ created: -1 })
        .then(khmeradmissions => {
            res.json(khmeradmissions);
        })
        .catch(err => console.log(err));
};

exports.khmeradmissionByUser = (req, res) => {
    KhmerAdmission.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id comments created')
        .sort('_created')
        .exec((err, khmeradmissions) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmeradmissions);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.khmeradmission && req.auth && req.khmeradmission.postedBy._id == req.auth._id;
    let adminUser = req.khmeradmission && req.auth && req.auth.role === 'admin';

    console.log("req.khmeradmission ", req.khmeradmission, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.comment = (req, res) => {
    let comment = req.body.comment;
    comment.uploadedBy = req.body.userId;

    KhmerAdmission.findByIdAndUpdate(req.body.admissionId, { $push: { comments: comment } }, { new: true})
        .populate('comments.uploadedBy', '_id name')
        .populate('uploadedBy', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        });
};

exports.uncomment = (req, res) => {
    let comment = req.body.comment;

    KhmerAdmission.findByIdAndUpdate(req.body.admissionId, { $pull: { comments: { _id: comment._id } } }, { new: true })
        .populate('comments.uploadedBy', '_id name')
        .populate('uploadedBy', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        });
};

exports.updateComment = (req, res) => {
    let comment = req.body.comment;

    KhmerAdmission.findByIdAndUpdate(req.body.admissionId, { $pull: { comments: { _id: comment._id } } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            KhmerAdmission.findByIdAndUpdate(
                req.body.admissionId,
                { $push: { comments: comment, updated: new Date() } },
                { new: true }
            )
                .populate('comments.uploadedBy', '_id name')
                .populate('uploadedBy', '_id name')
                .exec((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        });
                    } else {
                        res.json(result);
                    }
                });
        }
    });
};

exports.singlekhmeradmission = (req, res) => {
    return res.json(req.khmeradmission);
};



