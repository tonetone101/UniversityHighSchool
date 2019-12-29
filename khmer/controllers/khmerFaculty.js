const KhmerFaculty = require('../models/khmerFaculty');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getkhmerFaculty = (req, res, next) => {
   
    const khmerFaculty = KhmerFaculty.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about photo created")
        .sort({ created: -1 })
        .then(khmerFaculty => {
           res.json(khmerFaculty)
        })
        .catch(err => console.log(err));
      
};

exports.khmerFacultyById = (req, res, next, id) => {
    KhmerFaculty.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
        .exec((err, khmerFaculty) => {
            if (err || !khmerFaculty) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerFaculty = khmerFaculty;
            next();
        });
};

exports.createkhmerFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let khmerFaculty = new KhmerFaculty(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmerFaculty.postedBy = req.profile;
        if (files.photo) {
            khmerFaculty.photo.data = fs.readFileSync(files.photo.path);
            khmerFaculty.photo.contentType = files.photo.type;
        }
        khmerFaculty.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatekhmerFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let khmerFaculty = req.khmerFaculty;
        khmerFaculty = _.extend(khmerFaculty, fields);
        khmerFaculty.updated = Date.now();

        if (files.photo) {
            khmerFaculty.photo.data = fs.readFileSync(files.photo.path);
            khmerFaculty.photo.contentType = files.photo.type;
        }

        khmerFaculty.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerFaculty);
        });
    });
};

exports.deletekhmerFaculty = (req, res) => {
    let khmerFaculty = req.khmerFaculty;
    khmerFaculty.remove((err, khmerFaculty) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'khmerFaculty member deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.khmerFaculty.photo.contentType);
    return res.send(req.khmerFaculty.photo.data);
};

exports.singlekhmerFaculty = (req, res) => {
    return res.json(req.khmerFaculty);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.khmerFaculty && req.auth && req.khmerFaculty.postedBy._id == req.auth._id;
    let adminUser = req.khmerFaculty && req.auth && req.auth.role === 'admin';

    console.log("req.khmerFaculty ", req.khmerFaculty, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};