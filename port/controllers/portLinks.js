const portLinks = require('../models/portLinks');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.portLinksById = (req, res, next, id) => {
    PortLinks.findById(id)
        .populate('postedBy', '_id name role group')
        .select('_id body url created')
        .exec((err, portLinks) => {
            if (err || !portLinks) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portLinks = portLinks;
            next();
        });
};


exports.getportLinks = (req, res) => {
    const portLinks = PortLinks.find()
        .populate("postedBy", "_id name photo group")
        .select("_id url body created")
        .sort({ created: -1 })
        .then(portLinks => {
            res.json(portLinks);
        })
        .catch(err => console.log(err));
};


exports.createportLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let link = new PortLinks(fields);

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

exports.portLinksByUser = (req, res) => {
    portLinks.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name group')
        .select('_id body url created')
        .sort('_created')
        .exec((err, portLinks) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portLinks);
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

exports.updateportLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save upload
        let link = req.portLink;
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

exports.deleteportLink = (req, res) => {
    let link = req.link;
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
    res.set('Content-Type', req.portLink.photo.contentType);
    
    return res.send(req.portLink.photo.data);
};

exports.singleportLink = (req, res) => {
    return res.json(req.portLinks);
};