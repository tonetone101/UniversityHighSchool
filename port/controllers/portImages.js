const portImages = require('../models/portImages');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getportImages = (req, res, next) => {
   
    const portImages = PortImages.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id caption photo created")
        .sort({ created: -1 })
        .then(portImages => {
           res.json(portImages)
        })
        .catch(err => console.log(err));
      
};

exports.portImageById = (req, res, next, id) => {
    PortImages.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption photo created")
        .exec((err, portImage) => {
            if (err || !portImage) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portImages = portImage;
            next();
        });
};

exports.createportImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'portImage could not be uploaded'
            });
        };
        let portImage = new PortImages(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portImage.postedBy = req.profile;
        if (files.photo) {
            portImage.photo.data = fs.readFileSync(files.photo.path);
            portImage.photo.contentType = files.photo.type;
        }
        portImage.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateportImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let portImage = req.portImages;
        portImage = _.extend(portImage, fields);
        portImage.updated = Date.now();

        if (files.photo) {
            portImage.photo.data = fs.readFileSync(files.photo.path);
            portImage.photo.contentType = files.photo.type;
        }

        portImage.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portImage);
        });
    });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.portImages && req.auth && req.portImages.postedBy._id == req.auth._id;
    let adminUser = req.portImages && req.auth && req.auth.role === 'admin';

    console.log("req.portImages ", req.portImages, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.deleteportImage = (req, res) => {
    let portImage = req.portImages;
    portImage.remove((err, portImage) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'portImage deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.portImages.photo.contentType);
    return res.send(req.portImages.photo.data);
};

exports.singleportImage = (req, res) => {
    return res.json(req.portImages);
};