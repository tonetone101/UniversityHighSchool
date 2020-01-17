const About = require('../models/about');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.aboutById = (req, res, next, id) => {
    About.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id body paragraph2 paragraph3 paragraph4 paragraph5 url created photo')
        .exec((err, about) => {
            if (err || !about) {
                return res.status(400).json({
                    error: err
                });
            }
            req.about = about;
            next();
        });
};


exports.getabouts = (req, res, next) => { 
    const abouts = About.find()
        .populate("postedBy", "_id name photo role")
        .select("_id body paragraph2 paragraph3 paragraph4 paragraph5 url created photo")
        .sort({ created: -1 })
        .then(abouts => {
           res.json(abouts)
        })
        .catch(err => console.log(err));
      
};

exports.createabout = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let about = new About(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        about.postedBy = req.profile;
        if (files.photo) {
            about.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            about.photo.contentType = files.photo.type;
        }
        about.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.aboutsByUser = (req, res) => {
    About.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id body paragraph2 paragraph3 paragraph4 paragraph5 url photo created')
        .sort('_created')
        .exec((err, abouts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(abouts);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.about && req.auth && req.about.postedBy._id == req.auth._id;
    let adminUser = req.about && req.auth && req.auth.role === 'admin';

    console.log("req.about ", req.about, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updateabout = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let about = req.about;
        about = _.extend(about, fields);
        about.updated = Date.now();

        if (files.photo) {
            about.photo.data = fs.readFileSync(files.photo.path);
            about.photo.contentType = files.photo.type;
        }

        about.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(about);
        });
    });
};

exports.deleteabout = (req, res) => {
    let about = req.about;
    about.remove((err, about) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Post deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.about.photo.contentType);
    return res.send(req.about.photo.data);
};

exports.singleabout = (req, res) => {
    return res.json(req.about);
};



