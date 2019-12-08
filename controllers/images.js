const Images = require('../models/images');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getImages = (req, res, next) => {
   
    const images = Images.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id caption photo created")
        .sort({ created: -1 })
        .then(images => {
           res.json(images)
        })
        .catch(err => console.log(err));
      
};

exports.imageById = (req, res, next, id) => {
    Images.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption photo created")
        .exec((err, faculty) => {
            if (err || !faculty) {
                return res.status(400).json({
                    error: err
                });
            }
            req.faculty = faculty;
            next();
        });
};

exports.createImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let image = new Images(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        image.postedBy = req.profile;
        if (files.photo) {
            image.photo.data = fs.readFileSync(files.photo.path);
            image.photo.contentType = files.photo.type;
        }
        image.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let images = req.images;
        images = _.extend(images, fields);
        images.updated = Date.now();

        if (files.photo) {
            images.photo.data = fs.readFileSync(files.photo.path);
            images.photo.contentType = files.photo.type;
        }

        images.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(images);
        });
    });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.images && req.auth && req.images.postedBy._id == req.auth._id;
    let adminUser = req.images && req.auth && req.auth.role === 'admin';

    console.log("req.images ", req.images, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.deleteImage = (req, res) => {
    let image = req.images;
    image.remove((err, image) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Image deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.images.photo.contentType);
    return res.send(req.images.photo.data);
};

exports.singleImage = (req, res) => {
    return res.json(req.images);
};