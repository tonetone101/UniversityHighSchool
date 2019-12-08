const Faculty = require('../models/faculty');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getFaculty = (req, res, next) => {
   
    const faculty = Faculty.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about created")
        .sort({ created: -1 })
        .then(faculty => {
           res.json(faculty)
        })
        .catch(err => console.log(err));
      
};

exports.facultyById = (req, res, next, id) => {
    Faculty.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
        .exec((err, faculty) => {
            if (err || !faculty) {
                return res.status(400).json({
                    error: err
                });
            }
            req.faculty = faculty;
            next();
        });
};

exports.createFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let faculty = new Faculty(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        faculty.postedBy = req.profile;
        if (files.photo) {
            faculty.photo.data = fs.readFileSync(files.photo.path);
            faculty.photo.contentType = files.photo.type;
        }
        faculty.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let faculty = req.faculty;
        faculty = _.extend(faculty, fields);
        faculty.updated = Date.now();

        if (files.photo) {
            faculty.photo.data = fs.readFileSync(files.photo.path);
            faculty.photo.contentType = files.photo.type;
        }

        faculty.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(faculty);
        });
    });
};

exports.deleteFaculty = (req, res) => {
    let faculty = req.faculty;
    faculty.remove((err, faculty) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Faculty member deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.faculty.photo.contentType);
    return res.send(req.faculty.photo.data);
};

exports.singleFaculty = (req, res) => {
    return res.json(req.faculty);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.faculty && req.auth && req.faculty.postedBy._id == req.auth._id;
    let adminUser = req.faculty && req.auth && req.auth.role === 'admin';

    console.log("req.faculty ", req.faculty, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};