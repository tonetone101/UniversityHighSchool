const PortAdmission = require('../models/portAdmission');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.portadmissionById = (req, res, next, id) => {
    PortAdmission.findById(id)
        .populate("uploadedBy", "_id name")
        .populate("comments.uploadedBy", "_id name")
        .populate("uploadedBy", "_id name role")
        .select('_id title comments created photo')
        .exec((err, portadmission) => {
            if (err || !portadmission) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portadmission = portadmission;
            next();
        });
};

exports.createportadmission = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let portadmission = new PortAdmission(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portadmission.postedBy = req.profile;
        if (files.photo) {
            portadmission.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            portadmission.photo.contentType = files.photo.type;
        }
        portadmission.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.getportAdmissions = (req, res) => {
    const portadmissions = portAdmission.find()
        .populate("uploadedBy", "_id name photo group")
        .populate('comments', '_id text created')
        .populate("comments.uploadedBy", "_id name")
        .select("_id title comments")
        .sort({ created: -1 })
        .then(portadmissions => {
            res.json(portadmissions);
        })
        .catch(err => console.log(err));
};

exports.portadmissionByUser = (req, res) => {
    portAdmission.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id comments created')
        .sort('_created')
        .exec((err, portadmissions) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portadmissions);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.portadmission && req.auth && req.portadmission.postedBy._id == req.auth._id;
    let adminUser = req.portadmission && req.auth && req.auth.role === 'admin';

    console.log("req.portadmission ", req.portadmission, " req.auth ", req.auth);
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

    portAdmission.findByIdAndUpdate(req.body.admissionId, { $push: { comments: comment } }, { new: true})
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

    portAdmission.findByIdAndUpdate(req.body.admissionId, { $pull: { comments: { _id: comment._id } } }, { new: true })
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

    portAdmission.findByIdAndUpdate(req.body.admissionId, { $pull: { comments: { _id: comment._id } } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            portAdmission.findByIdAndUpdate(
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

exports.singleportadmission = (req, res) => {
    return res.json(req.portadmission);
};



