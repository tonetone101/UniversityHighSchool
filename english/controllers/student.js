const Student = require('../models/student');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getStudents = (req, res, next) => {
   const student = Student.find()
        .select("_id parent student email contact message created")
        .sort({ created: -1 })
        .then(student => {
           res.json(student)
        })
        .catch(err => console.log(err));
      
};

exports.studentById = (req, res, next, id) => {
    Student.findById(id)
   .select("_id parent student email contact message created")
   .exec((err, student) => {
            if (err || !student) {
                return res.status(400).json({
                    error: err
                });
            }
            req.student = student;
            next();
        });
};

// exports.createRegister = (req, res, next) => {
//         let register = new Register(req.body);
//         register.save((err, result) => {
//             if (err) {
//                 console.log(err)
//                 return res.status(400).json({
//                     error: err
//                 });
               
//             }
//             res.json(result);
//         });
// };

exports.createStudent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let student = new Student(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        student.postedBy = req.profile;
        if (files.photo) {
            student.photo.data = fs.readFileSync(files.photo.path);
            student.photo.contentType = files.photo.type;
        }
        student.save((err, result) => {
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

exports.updateStudent = (req, res, next) => {
    let student = req.student;
    student = _.extend(student, req.body);
    student.updated = Date.now();
    student.save(err => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(student);
    });
};

exports.deleteStudent = (req, res) => {
    let student = req.student;
    student.remove((err, student) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'student deleted successfully'
        });
    });
};

exports.singleStudent = (req, res) => {
    return res.json(req.student);
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
