const Links = require('../models/links');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.linksById = (req, res, next, id) => {
    Links.findById(id)
        .populate('postedBy', '_id name role group')
        .select('_id title body photo created')
        .exec((err, links) => {
            if (err || !links) {
                return res.status(400).json({
                    error: err
                });
            }
            req.links = links;
            next();
        });
};


exports.getLinks = (req, res) => {
    const links = Links.find()
        .populate("postedBy", "_id name photo group")
        .select("_id title body photo created")
        .sort({ created: -1 })
        .then(links => {
            res.json(links);
        })
        .catch(err => console.log(err));
};


exports.createLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let link = new Links(fields);

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

exports.linksByUser = (req, res) => {
    Links.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name group')
        .select('_id title body photo created')
        .sort('_created')
        .exec((err, links) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(links);
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

exports.updateLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save upload
        let link = req.links;
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

exports.deleteLink = (req, res) => {
    let link = req.links;
    link.remove((err, link) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'content deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.links.photo.contentType);
    return res.send(req.links.photo.data);
};

exports.singleLink = (req, res) => {
    return res.json(req.links);
};