const PortSchoolBoardMember = require('../models/portschoolBoardMembers');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getportschoolBoardMember = (req, res, next) => {
   
    const portschoolBoardMember = PortSchoolBoardMember.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about photo created")
        .sort({ created: -1 })
        .then(portschoolBoardMember => {
           res.json(portschoolBoardMember)
        })
        .catch(err => console.log(err));
      
};

exports.portschoolBoardMemberById = (req, res, next, id) => {
    PortSchoolBoardMember.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
        .exec((err, portschoolBoardMember) => {
            if (err || !portschoolBoardMember) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portschoolBoardMember = portschoolBoardMember;
            next();
        });
};

exports.createportschoolBoardMember = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let portschoolBoardMember = new PortSchoolBoardMember(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portschoolBoardMember.postedBy = req.profile;
        if (files.photo) {
            portschoolBoardMember.photo.data = fs.readFileSync(files.photo.path);
            portschoolBoardMember.photo.contentType = files.photo.type;
        }
        portschoolBoardMember.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateportschoolBoardMember = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let portschoolBoardMember = req.portschoolBoardMember;
        portschoolBoardMember = _.extend(portschoolBoardMember, fields);
        portschoolBoardMember.updated = Date.now();

        if (files.photo) {
            portschoolBoardMember.photo.data = fs.readFileSync(files.photo.path);
            portschoolBoardMember.photo.contentType = files.photo.type;
        }

        portschoolBoardMember.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portschoolBoardMember);
        });
    });
};

exports.deleteportschoolBoardMember = (req, res) => {
    let portschoolBoardMember = req.portschoolBoardMember;
    portschoolBoardMember.remove((err, portschoolBoardMember) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'portschoolBoard member deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.portschoolBoardMember.photo.contentType);
    return res.send(req.portschoolBoardMember.photo.data);
};

exports.singleportschoolBoardMember = (req, res) => {
    return res.json(req.portschoolBoardMember);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.portschoolBoardMember && req.auth && req.portschoolBoardMember.postedBy._id == req.auth._id;
    let adminUser = req.portschoolBoardMember && req.auth && req.auth.role === 'admin';

    console.log("req.portschoolBoardMember ", req.portschoolBoardMember, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};