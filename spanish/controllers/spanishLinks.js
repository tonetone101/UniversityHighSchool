const SpanishLinks = require('../models/spanishLinks');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.spanishLinksById = (req, res, next, id) => {
    SpanishLinks.findById(id)
        .populate('postedBy', '_id name role group')
        .select('_id body url created')
        .exec((err, spanishLinks) => {
            if (err || !spanishLinks) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishLinks = spanishLinks;
            next();
        });
};


exports.getspanishLinks = (req, res) => {
    const spanishLinks = SpanishLinks.find()
        .populate("postedBy", "_id name photo group")
        .select("_id url body created")
        .sort({ created: -1 })
        .then(spanishLinks => {
            res.json(spanishLinks);
        })
        .catch(err => console.log(err));
};


exports.createspanishLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let link = new SpanishLinks(fields);

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

exports.spanishLinksByUser = (req, res) => {
    spanishLinks.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name group')
        .select('_id body url created')
        .sort('_created')
        .exec((err, spanishLinks) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishLinks);
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

exports.updatespanishLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save upload
        let link = req.link;
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

exports.deletespanishLink = (req, res) => {
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
    res.set('Content-Type', req.link.photo.contentType);
    
    return res.send(req.link.photo.data);
};

exports.singlespanishLink = (req, res) => {
    return res.json(req.spanishLinks);
};