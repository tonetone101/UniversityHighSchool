const khmerSchoolBoardMember = require('../models/KhmerschoolBoardMembers');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getkhmerschoolBoardMember = (req, res, next) => {
   
    const khmerschoolBoardMember = KhmerSchoolBoardMember.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about photo created")
        .sort({ created: -1 })
        .then(khmerschoolBoardMember => {
           res.json(khmerschoolBoardMember)
        })
        .catch(err => console.log(err));
      
};

exports.khmerschoolBoardMemberById = (req, res, next, id) => {
    KhmerSchoolBoardMember.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
        .exec((err, khmerschoolBoardMember) => {
            if (err || !khmerschoolBoardMember) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerschoolBoardMember = khmerschoolBoardMember;
            next();
        });
};

exports.createkhmerschoolBoardMember = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let khmerschoolBoardMember = new KhmerSchoolBoardMember(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmerschoolBoardMember.postedBy = req.profile;
        if (files.photo) {
            khmerschoolBoardMember.photo.data = fs.readFileSync(files.photo.path);
            khmerschoolBoardMember.photo.contentType = files.photo.type;
        }
        khmerschoolBoardMember.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatekhmerschoolBoardMember = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let khmerschoolBoardMember = req.khmerschoolBoardMember;
        khmerschoolBoardMember = _.extend(khmerschoolBoardMember, fields);
        khmerschoolBoardMember.updated = Date.now();

        if (files.photo) {
            khmerschoolBoardMember.photo.data = fs.readFileSync(files.photo.path);
            khmerschoolBoardMember.photo.contentType = files.photo.type;
        }

        khmerschoolBoardMember.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerschoolBoardMember);
        });
    });
};

exports.deletekhmerschoolBoardMember = (req, res) => {
    let khmerschoolBoardMember = req.khmerschoolBoardMember;
    khmerschoolBoardMember.remove((err, khmerschoolBoardMember) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'khmerschoolBoard member deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.khmerschoolBoardMember.photo.contentType);
    return res.send(req.khmerschoolBoardMember.photo.data);
};

exports.singlekhmerschoolBoardMember = (req, res) => {
    return res.json(req.khmerschoolBoardMember);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.khmerschoolBoardMember && req.auth && req.khmerschoolBoardMember.postedBy._id == req.auth._id;
    let adminUser = req.khmerschoolBoardMember && req.auth && req.auth.role === 'admin';

    console.log("req.khmerschoolBoardMember ", req.khmerschoolBoardMember, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};