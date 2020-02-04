const KhmerLinks = require('../models/khmerLinks');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.khmerLinksById = (req, res, next, id) => {
    KhmerLinks.findById(id)
        .populate('postedBy', '_id name role group')
        .select('_id body url created')
        .exec((err, khmerLinks) => {
            if (err || !khmerLinks) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerLinks = khmerLinks;
            next();
        });
};


exports.getkhmerLinks = (req, res) => {
    const khmerLinks = KhmerLinks.find()
        .populate("postedBy", "_id name photo group")
        .select("_id url body created")
        .sort({ created: -1 })
        .then(khmerLinks => {
            res.json(khmerLinks);
        })
        .catch(err => console.log(err));
};


exports.createkhmerLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let link = new KhmerLinks(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        link.postedBy = req.profile;

        if (files.photo) {
            link.photo.data = fs.readFileSync(files.photo.path);
            link.photo.contentType = files.photo.type;
        }
        link.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.khmerLinksByUser = (req, res) => {
    khmerLinks.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name group')
        .select('_id body url created')
        .sort('_created')
        .exec((err, khmerLinks) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerLinks);
        });
};

exports.isPoster = (req, res, next) => {
    let sameUser = req.link && req.auth && req.link.postedBy._id == req.auth._id;
    let adminUser = req.upload && req.auth && req.auth.role === 'admin';

    // console.log("req.upload ", req.upload, " req.auth ", req.auth);
    // console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isPoster = sameUser || adminUser;

    if (!isPoster) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.updatekhmerLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save upload
        let link = req.khmerLink;
        link = _.extend(link, fields);
        link.updated = Date.now();

        if (files.photo) {
            link.photo.data = fs.readFileSync(files.photo.path);
            link.photo.contentType = files.photo.type;
        }

        link.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(link);
        });
    });
};

exports.deletekhmerLink = (req, res) => {
    let link = req.khmerLinks;
    link.remove((err, link) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'link deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.khmerLink.photo.contentType);
    
    return res.send(req.khmerLink.photo.data);
};

exports.singlekhmerLink = (req, res) => {
    return res.json(req.khmerLinks);
};