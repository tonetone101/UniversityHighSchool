const SpanishspanishSchoolBoardMember = require('../models/spanishspanishschoolBoardMembers');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getspanishschoolBoardMember = (req, res, next) => {
   
    const spanishschoolBoardMember = SpanishSchoolBoardMember.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about photo created")
        .sort({ created: -1 })
        .then(spanishschoolBoardMember => {
           res.json(spanishschoolBoardMember)
        })
        .catch(err => console.log(err));
      
};

exports.spanishschoolBoardMemberById = (req, res, next, id) => {
    SpanishSchoolBoardMember.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
        .exec((err, spanishschoolBoardMember) => {
            if (err || !spanishschoolBoardMember) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishschoolBoardMember = spanishschoolBoardMember;
            next();
        });
};

exports.createspanishschoolBoardMember = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let spanishschoolBoardMember = new SpanishSchoolBoardMember(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishschoolBoardMember.postedBy = req.profile;
        if (files.photo) {
            spanishschoolBoardMember.photo.data = fs.readFileSync(files.photo.path);
            spanishschoolBoardMember.photo.contentType = files.photo.type;
        }
        spanishschoolBoardMember.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatespanishschoolBoardMember = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let spanishschoolBoardMember = req.spanishschoolBoardMember;
        spanishschoolBoardMember = _.extend(spanishschoolBoardMember, fields);
        spanishschoolBoardMember.updated = Date.now();

        if (files.photo) {
            spanishschoolBoardMember.photo.data = fs.readFileSync(files.photo.path);
            spanishschoolBoardMember.photo.contentType = files.photo.type;
        }

        spanishschoolBoardMember.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishschoolBoardMember);
        });
    });
};

exports.deletespanishschoolBoardMember = (req, res) => {
    let spanishschoolBoardMember = req.spanishschoolBoardMember;
    spanishschoolBoardMember.remove((err, spanishschoolBoardMember) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'spanishschoolBoard member deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.spanishschoolBoardMember.photo.contentType);
    return res.send(req.spanishschoolBoardMember.photo.data);
};

exports.singlespanishschoolBoardMember = (req, res) => {
    return res.json(req.spanishschoolBoardMember);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.spanishschoolBoardMember && req.auth && req.spanishschoolBoardMember.postedBy._id == req.auth._id;
    let adminUser = req.spanishschoolBoardMember && req.auth && req.auth.role === 'admin';

    console.log("req.spanishschoolBoardMember ", req.spanishschoolBoardMember, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};