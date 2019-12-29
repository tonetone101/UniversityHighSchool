const SpanishStudent = require('../models/spanishStudent');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getspanishStudents = (req, res, next) => {
   const spanishStudent = SpanishStudent.find()
        .select("_id parent spanishStudent bitrthday contact created")
        .sort({ created: -1 })
        .then(spanishStudent => {
           res.json(spanishStudent)
        })
        .catch(err => console.log(err));
      
};

exports.spanishStudentById = (req, res, next, id) => {
    SpanishStudent.findById(id)
   .select("_id parent spanishStudent bitrthday contact created")
   .exec((err, spanishStudent) => {
            if (err || !spanishStudent) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishStudent = spanishStudent;
            next();
        });
};

exports.createspanishStudent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let spanishStudent = new SpanishStudent(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishStudent.postedBy = req.profile;
        if (files.photo) {
            spanishStudent.photo.data = fs.readFileSync(files.photo.path);
            spanishStudent.photo.contentType = files.photo.type;
        }
        spanishStudent.save((err, result) => {
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

exports.updatespanishStudent = (req, res, next) => {
    let spanishStudent = req.spanishStudent;
    spanishStudent = _.extend(spanishStudent, req.body);
    spanishStudent.updated = Date.now();
    spanishStudent.save(err => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(spanishStudent);
    });
};

exports.deletespanishStudent = (req, res) => {
    let spanishStudent = req.spanishStudent;
    spanishStudent.remove((err, spanishStudent) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'spanishStudent deleted successfully'
        });
    });
};

exports.singlespanishStudent = (req, res) => {
    return res.json(req.spanishStudent);
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
