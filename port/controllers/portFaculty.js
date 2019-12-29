const portFaculty = require('../models/portFaculty');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getportFaculty = (req, res, next) => {
   
    const portFaculty = PortFaculty.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about photo created")
        .sort({ created: -1 })
        .then(portFaculty => {
           res.json(portFaculty)
        })
        .catch(err => console.log(err));
      
};

exports.portFacultyById = (req, res, next, id) => {
    PortFaculty.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
        .exec((err, portFaculty) => {
            if (err || !portFaculty) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portFaculty = portFaculty;
            next();
        });
};

exports.createportFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let portFaculty = new PortFaculty(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portFaculty.postedBy = req.profile;
        if (files.photo) {
            portFaculty.photo.data = fs.readFileSync(files.photo.path);
            portFaculty.photo.contentType = files.photo.type;
        }
        portFaculty.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateportFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let portFaculty = req.portFaculty;
        portFaculty = _.extend(portFaculty, fields);
        portFaculty.updated = Date.now();

        if (files.photo) {
            portFaculty.photo.data = fs.readFileSync(files.photo.path);
            portFaculty.photo.contentType = files.photo.type;
        }

        portFaculty.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portFaculty);
        });
    });
};

exports.deleteportFaculty = (req, res) => {
    let portFaculty = req.portFaculty;
    portFaculty.remove((err, portFaculty) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'portFaculty member deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.portFaculty.photo.contentType);
    return res.send(req.portFaculty.photo.data);
};

exports.singleportFaculty = (req, res) => {
    return res.json(req.portFaculty);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.portFaculty && req.auth && req.portFaculty.postedBy._id == req.auth._id;
    let adminUser = req.portFaculty && req.auth && req.auth.role === 'admin';

    console.log("req.portFaculty ", req.portFaculty, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};