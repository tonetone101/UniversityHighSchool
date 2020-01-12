const SchoolBoardMember = require('../models/schoolBoardMembers');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getschoolBoardMember = (req, res, next) => {
   
    const schoolBoardMember = SchoolBoardMember.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about photo created")
        .sort({ created: -1 })
        .then(schoolBoardMember => {
           res.json(schoolBoardMember)
        })
        .catch(err => console.log(err));
      
};

exports.schoolBoardMemberById = (req, res, next, id) => {
    SchoolBoardMember.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
        .exec((err, schoolBoardMember) => {
            if (err || !schoolBoardMember) {
                return res.status(400).json({
                    error: err
                });
            }
            req.schoolBoardMember = schoolBoardMember;
            next();
        });
};

exports.createschoolBoardMember = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let schoolBoardMember = new SchoolBoardMember(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        schoolBoardMember.postedBy = req.profile;
        if (files.photo) {
            schoolBoardMember.photo.data = fs.readFileSync(files.photo.path);
            schoolBoardMember.photo.contentType = files.photo.type;
        }
        schoolBoardMember.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateschoolBoardMember = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let schoolBoardMember = req.schoolBoardMember;
        schoolBoardMember = _.extend(schoolBoardMember, fields);
        schoolBoardMember.updated = Date.now();

        if (files.photo) {
            schoolBoardMember.photo.data = fs.readFileSync(files.photo.path);
            schoolBoardMember.photo.contentType = files.photo.type;
        }

        schoolBoardMember.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(schoolBoardMember);
        });
    });
};

exports.deleteschoolBoardMember = (req, res) => {
    let schoolBoardMember = req.schoolBoardMember;
    schoolBoardMember.remove((err, schoolBoardMember) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'schoolBoard member deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.schoolBoardMember.photo.contentType);
    return res.send(req.schoolBoardMember.photo.data);
};

exports.singleschoolBoardMember = (req, res) => {
    return res.json(req.schoolBoardMember);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.schoolBoardMember && req.auth && req.schoolBoardMember.postedBy._id == req.auth._id;
    let adminUser = req.schoolBoardMember && req.auth && req.auth.role === 'admin';

    console.log("req.schoolBoardMember ", req.schoolBoardMember, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};