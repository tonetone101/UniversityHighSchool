const hmongStudent = require('../models/hmongStudent');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.gethmongStudents = (req, res, next) => {
   const hmongStudent = HmongStudent.find()
        .select("_id parent hmongStudent bitrthday contact created")
        .sort({ created: -1 })
        .then(hmongStudent => {
           res.json(hmongStudent)
        })
        .catch(err => console.log(err));
      
};

exports.hmongStudentById = (req, res, next, id) => {
    HmongStudent.findById(id)
   .select("_id parent hmongStudent bitrthday contact created")
   .exec((err, hmongStudent) => {
            if (err || !hmongStudent) {
                return res.status(400).json({
                    error: err
                });
            }
            req.hmongStudent = hmongStudent;
            next();
        });
};

exports.createhmongStudent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let hmongStudent = new HmongStudent(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        hmongStudent.postedBy = req.profile;
        if (files.photo) {
            hmongStudent.photo.data = fs.readFileSync(files.photo.path);
            hmongStudent.photo.contentType = files.photo.type;
        }
        hmongStudent.save((err, result) => {
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

exports.updatehmongStudent = (req, res, next) => {
    let hmongStudent = req.hmongStudent;
    hmongStudent = _.extend(hmongStudent, req.body);
    hmongStudent.updated = Date.now();
    hmongStudent.save(err => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(hmongStudent);
    });
};

exports.deletehmongStudent = (req, res) => {
    let hmongStudent = req.hmongStudent;
    hmongStudent.remove((err, hmongStudent) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'hmongStudent deleted successfully'
        });
    });
};

exports.singlehmongStudent = (req, res) => {
    return res.json(req.hmongStudent);
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
