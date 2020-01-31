const KhmerAbout = require('../models/khmerAbout');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.khmeraboutById = (req, res, next, id) => {
    KhmerAbout.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id body paragraph2 paragraph3 paragraph4 paragraph5 url created photo')
        .exec((err, khmerabout) => {
            if (err || !khmerabout) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerabout = khmerabout;
            next();
        });
};


exports.getkhmerabouts = (req, res, next) => { 
    const khmerabouts = KhmerAbout.find()
        .populate("postedBy", "_id name photo role")
        .select("_id body paragraph2 paragraph3 paragraph4 paragraph5 url created photo")
        .sort({ created: -1 })
        .then(khmerabouts => {
           res.json(khmerabouts)
        })
        .catch(err => console.log(err));
      
};

exports.createkhmerabout = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let khmerabout = new KhmerAbout(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmerabout.postedBy = req.profile;
        if (files.photo) {
            khmerabout.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            khmerabout.photo.contentType = files.photo.type;
        }
        khmerabout.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.khmeraboutsByUser = (req, res) => {
    KhmerAbout.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id body paragraph2 paragraph3 paragraph4 paragraph5 url photo created')
        .sort('_created')
        .exec((err, khmerabouts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerabouts);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.khmerabout && req.auth && req.khmerabout.postedBy._id == req.auth._id;
    let adminUser = req.khmerabout && req.auth && req.auth.role === 'admin';

    console.log("req.khmerabout ", req.khmerabout, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updatekhmerabout = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let khmerabout = req.khmerabout;
        khmerabout = _.extend(khmerabout, fields);
        khmerabout.updated = Date.now();

        if (files.photo) {
            khmerabout.photo.data = fs.readFileSync(files.photo.path);
            khmerabout.photo.contentType = files.photo.type;
        }

        khmerabout.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerabout);
        });
    });
};

exports.deletekhmerabout = (req, res) => {
    let khmerabout = req.khmerabout;
    khmerabout.remove((err, khmerabout) => {
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
    res.set('Content-Type', req.khmerabout.photo.contentType);
    return res.send(req.khmerabout.photo.data);
};

exports.singlekhmerabout = (req, res) => {
    return res.json(req.khmerabout);
};



