const portStudent = require('../models/portStudent');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getportStudents = (req, res, next) => {
   const portStudent = PortStudent.find()
        .select("_id parent portStudent bitrthday contact created")
        .sort({ created: -1 })
        .then(portStudent => {
           res.json(portStudent)
        })
        .catch(err => console.log(err));
      
};

exports.portStudentById = (req, res, next, id) => {
    PortStudent.findById(id)
   .select("_id parent portStudent bitrthday contact created")
   .exec((err, portStudent) => {
            if (err || !portStudent) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portStudent = portStudent;
            next();
        });
};

exports.createportStudent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let portStudent = new PortStudent(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portStudent.postedBy = req.profile;
        if (files.photo) {
            portStudent.photo.data = fs.readFileSync(files.photo.path);
            portStudent.photo.contentType = files.photo.type;
        }
        portStudent.save((err, result) => {
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

exports.updateportStudent = (req, res, next) => {
    let portStudent = req.portStudent;
    portStudent = _.extend(portStudent, req.body);
    portStudent.updated = Date.now();
    portStudent.save(err => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(portStudent);
    });
};

exports.deleteportStudent = (req, res) => {
    let portStudent = req.portStudent;
    portStudent.remove((err, portStudent) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'portStudent deleted successfully'
        });
    });
};

exports.singleportStudent = (req, res) => {
    return res.json(req.portStudent);
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
