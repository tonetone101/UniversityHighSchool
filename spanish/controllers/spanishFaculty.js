const SpanishFaculty = require('../models/spanishFaculty');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getspanishFaculty = (req, res, next) => {
   
    const spanishFaculty = SpanishFaculty.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about photo created")
        .sort({ created: -1 })
        .then(spanishFaculty => {
           res.json(spanishFaculty)
        })
        .catch(err => console.log(err));
      
};

exports.spanishFacultyById = (req, res, next, id) => {
    SpanishFaculty.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
        .exec((err, spanishFaculty) => {
            if (err || !spanishFaculty) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishFaculty = spanishFaculty;
            next();
        });
};

exports.createspanishFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let spanishFaculty = new SpanishFaculty(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishFaculty.postedBy = req.profile;
        if (files.photo) {
            spanishFaculty.photo.data = fs.readFileSync(files.photo.path);
            spanishFaculty.photo.contentType = files.photo.type;
        }
        spanishFaculty.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatespanishFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let spanishFaculty = req.spanishFaculty;
        spanishFaculty = _.extend(spanishFaculty, fields);
        spanishFaculty.updated = Date.now();

        if (files.photo) {
            spanishFaculty.photo.data = fs.readFileSync(files.photo.path);
            spanishFaculty.photo.contentType = files.photo.type;
        }

        spanishFaculty.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishFaculty);
        });
    });
};

exports.deletespanishFaculty = (req, res) => {
    let spanishFaculty = req.spanishFaculty;
    spanishFaculty.remove((err, spanishFaculty) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'spanishFaculty member deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.spanishFaculty.photo.contentType);
    return res.send(req.spanishFaculty.photo.data);
};

exports.singlespanishFaculty = (req, res) => {
    return res.json(req.spanishFaculty);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.spanishFaculty && req.auth && req.spanishFaculty.postedBy._id == req.auth._id;
    let adminUser = req.spanishFaculty && req.auth && req.auth.role === 'admin';

    console.log("req.spanishFaculty ", req.faculty, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};