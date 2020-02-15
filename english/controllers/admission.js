const Admission = require('../models/admission');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.admissionById = (req, res, next, id) => {
    Admission.findById(id)
        .populate("uploadedBy", "_id name")
        .populate("comments.uploadedBy", "_id name")
        .populate("uploadedBy", "_id name role")
        .select('_id title comments created photo')
        .exec((err, admission) => {
            if (err || !admission) {
                return res.status(400).json({
                    error: err
                });
            }
            req.admission = admission;
            next();
        });
};

exports.createadmission = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let admission = new Admission(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        admission.postedBy = req.profile;
        if (files.photo) {
            admission.photo.data = fs.readFileSync(files.photo.path);
            admission.photo.contentType = files.photo.type;
        }
        admission.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.getAdmissions = (req, res) => {
    const admissions = Admission.find()
        .populate("uploadedBy", "_id name photo group")
        .populate('comments', '_id text created')
        .populate("comments.uploadedBy", "_id name")
        .select("_id title comments")
        .sort({ created: -1 })
        .then(admissions => {
            res.json(admissions);
        })
        .catch(err => console.log(err));
};

exports.admissionByUser = (req, res) => {
    Admission.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id comments created')
        .sort('_created')
        .exec((err, admissions) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(admissions);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.admission && req.auth && req.admission.postedBy._id == req.auth._id;
    let adminUser = req.admission && req.auth && req.auth.role === 'admin';

    console.log("req.admission ", req.admission, " req.auth ", req.auth);
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

    Admission.findByIdAndUpdate(req.body.admissionId, { $push: { comments: comment } }, { new: true})
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

    Admission.findByIdAndUpdate(req.body.admissionId, { $pull: { comments: { _id: comment._id } } }, { new: true })
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

    Admission.findByIdAndUpdate(req.body.admissionId, { $pull: { comments: { _id: comment._id } } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            Admission.findByIdAndUpdate(
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

exports.singleadmission = (req, res) => {
    return res.json(req.admission);
};



