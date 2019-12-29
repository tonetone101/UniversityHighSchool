const KhmerStudent = require('../models/khmerStudent');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getkhmerStudents = (req, res, next) => {
   const khmerStudent = KhmerStudent.find()
        .select("_id parent khmerStudent bitrthday contact created")
        .sort({ created: -1 })
        .then(khmerStudent => {
           res.json(khmerStudent)
        })
        .catch(err => console.log(err));
      
};

exports.khmerStudentById = (req, res, next, id) => {
    KhmerStudent.findById(id)
   .select("_id parent khmerStudent bitrthday contact created")
   .exec((err, khmerStudent) => {
            if (err || !khmerStudent) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerStudent = khmerStudent;
            next();
        });
};

exports.createkhmerStudent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let khmerStudent = new KhmerStudent(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmerStudent.postedBy = req.profile;
        if (files.photo) {
            khmerStudent.photo.data = fs.readFileSync(files.photo.path);
            khmerStudent.photo.contentType = files.photo.type;
        }
        khmerStudent.save((err, result) => {
            if (err) {
                return res.json({
                    error: err
                })
            } else {
            res.json(result);
            }
        });
    });
};

exports.updatekhmerStudent = (req, res, next) => {
    let khmerStudent = req.khmerStudent;
    khmerStudent = _.extend(khmerStudent, req.body);
    khmerStudent.updated = Date.now();
    khmerStudent.save(err => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(khmerStudent);
    });
};

exports.deletekhmerStudent = (req, res) => {
    let khmerStudent = req.khmerStudent;
    khmerStudent.remove((err, khmerStudent) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'khmerStudent deleted successfully'
        });
    });
};

exports.singlekhmerStudent = (req, res) => {
    return res.json(req.khmerStudent);
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
