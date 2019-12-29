const hmongFaculty = require('../models/hmongFaculty');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.gethmongFaculty = (req, res, next) => {
   
    const hmongFaculty = HmongFaculty.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about photo created")
        .sort({ created: -1 })
        .then(hmongFaculty => {
           res.json(hmongFaculty)
        })
        .catch(err => console.log(err));
      
};

exports.hmongFacultyById = (req, res, next, id) => {
    HmongFaculty.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
        .exec((err, hmongFaculty) => {
            if (err || !hmongFaculty) {
                return res.status(400).json({
                    error: err
                });
            }
            req.hmongFaculty = hmongFaculty;
            next();
        });
};

exports.createhmongFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let hmongFaculty = new HmongFaculty(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        hmongFaculty.postedBy = req.profile;
        if (files.photo) {
            hmongFaculty.photo.data = fs.readFileSync(files.photo.path);
            hmongFaculty.photo.contentType = files.photo.type;
        }
        hmongFaculty.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatehmongFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let hmongFaculty = req.hmongFaculty;
        hmongFaculty = _.extend(hmongFaculty, fields);
        hmongFaculty.updated = Date.now();

        if (files.photo) {
            hmongFaculty.photo.data = fs.readFileSync(files.photo.path);
            hmongFaculty.photo.contentType = files.photo.type;
        }

        hmongFaculty.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(hmongFaculty);
        });
    });
};

exports.deletehmongFaculty = (req, res) => {
    let hmongFaculty = req.hmongFaculty;
    hmongFaculty.remove((err, hmongFaculty) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'hmongFaculty member deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.hmongFaculty.photo.contentType);
    return res.send(req.hmongFaculty.photo.data);
};

exports.singlehmongFaculty = (req, res) => {
    return res.json(req.hmongFaculty);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.hmongFaculty && req.auth && req.hmongFaculty.postedBy._id == req.auth._id;
    let adminUser = req.hmongFaculty && req.auth && req.auth.role === 'admin';

    console.log("req.hmongFaculty ", req.hmongFaculty, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};