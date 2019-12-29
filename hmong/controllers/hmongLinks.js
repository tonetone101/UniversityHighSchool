const hmongLinks = require('../models/hmongLinks');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.hmongLinksById = (req, res, next, id) => {
    HmongLinks.findById(id)
        .populate('postedBy', '_id name role group')
        .select('_id body url created')
        .exec((err, hmongLinks) => {
            if (err || !hmongLinks) {
                return res.status(400).json({
                    error: err
                });
            }
            req.hmongLinks = hmongLinks;
            next();
        });
};


exports.gethmongLinks = (req, res) => {
    const hmongLinks = HmongLinks.find()
        .populate("postedBy", "_id name photo group")
        .select("_id url body created")
        .sort({ created: -1 })
        .then(hmongLinks => {
            res.json(hmongLinks);
        })
        .catch(err => console.log(err));
};


exports.createhmongLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let link = new HmongLinks(fields);

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

exports.hmongLinksByUser = (req, res) => {
    HmongLinks.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name group')
        .select('_id body url created')
        .sort('_created')
        .exec((err, hmongLinks) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(hmongLinks);
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

exports.updatehmongLink = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save upload
        let link = req.hmongLink;
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

exports.deletehmongLink = (req, res) => {
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
    res.set('Content-Type', req.hmongLink.photo.contentType);
    
    return res.send(req.hmongLink.photo.data);
};

exports.singlehmongLink = (req, res) => {
    return res.json(req.hmongLinks);
};