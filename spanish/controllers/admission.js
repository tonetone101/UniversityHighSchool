const SpanishAdmission = require('../models/admission');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.spanishadmissionById = (req, res, next, id) => {
    SpanishAdmission.findById(id)
        .populate("uploadedBy", "_id name")
        .populate("comments.uploadedBy", "_id name")
        .populate("uploadedBy", "_id name role")
        .select('_id title comments created photo')
        .exec((err, spanishadmission) => {
            if (err || !spanishadmission) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishadmission = spanishadmission;
            next();
        });
};

exports.createspanishadmission = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let spanishadmission = new SpanishAdmission(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishadmission.postedBy = req.profile;
        if (files.photo) {
            spanishadmission.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            spanishadmission.photo.contentType = files.photo.type;
        }
        spanishadmission.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.getspanishAdmissions = (req, res) => {
    const spanishadmissions = SpanishAdmission.find()
        .populate("uploadedBy", "_id name photo group")
        .populate('comments', '_id text created')
        .populate("comments.uploadedBy", "_id name")
        .select("_id title comments")
        .sort({ created: -1 })
        .then(spanishadmissions => {
            res.json(spanishadmissions);
        })
        .catch(err => console.log(err));
};

exports.spanishadmissionByUser = (req, res) => {
    SpanishAdmission.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id comments created')
        .sort('_created')
        .exec((err, spanishadmissions) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishadmissions);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.spanishadmission && req.auth && req.spanishadmission.postedBy._id == req.auth._id;
    let adminUser = req.spanishadmission && req.auth && req.auth.role === 'admin';

    console.log("req.spanishadmission ", req.spanishadmission, " req.auth ", req.auth);
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

    SpanishAdmission.findByIdAndUpdate(req.body.spanishadmissionId, { $push: { comments: comment } }, { new: true})
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

    SpanishAdmission.findByIdAndUpdate(req.body.spanishadmissionId, { $pull: { comments: { _id: comment._id } } }, { new: true })
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

    SpanishAdmission.findByIdAndUpdate(req.body.spanishadmissionId, { $pull: { comments: { _id: comment._id } } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            SpanishAdmission.findByIdAndUpdate(
                req.body.spanishadmissionId,
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

exports.singlespanishadmission = (req, res) => {
    return res.json(req.spanishadmission);
};



