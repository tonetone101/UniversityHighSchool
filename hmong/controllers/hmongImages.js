const hmongImages = require('../models/hmongImages');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.gethmongImages = (req, res, next) => {
   
    const hmongImages = HmongImages.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id caption photo created")
        .sort({ created: -1 })
        .then(hmongImages => {
           res.json(hmongImages)
        })
        .catch(err => console.log(err));
      
};

exports.hmongImageById = (req, res, next, id) => {
    HmongImages.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption photo created")
        .exec((err, hmongImage) => {
            if (err || !hmongImage) {
                return res.status(400).json({
                    error: err
                });
            }
            req.hmongImages = hmongImage;
            next();
        });
};

exports.createhmongImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'hmongImage could not be uploaded'
            });
        };
        let hmongImage = new HmongImages(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        hmongImage.postedBy = req.profile;
        if (files.photo) {
            hmongImage.photo.data = fs.readFileSync(files.photo.path);
            hmongImage.photo.contentType = files.photo.type;
        }
        hmongImage.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatehmongImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let hmongImage = req.hmongImages;
        hmongImage = _.extend(hmongImage, fields);
        hmongImage.updated = Date.now();

        if (files.photo) {
            hmongImage.photo.data = fs.readFileSync(files.photo.path);
            hmongImage.photo.contentType = files.photo.type;
        }

        hmongImage.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(hmongImage);
        });
    });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.hmongImages && req.auth && req.hmongImages.postedBy._id == req.auth._id;
    let adminUser = req.hmongImages && req.auth && req.auth.role === 'admin';

    console.log("req.hmongImages ", req.hmongImages, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.deletehmongImage = (req, res) => {
    let hmongImage = req.hmongImages;
    hmongImage.remove((err, hmongImage) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'hmongImage deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.hmongImages.photo.contentType);
    return res.send(req.hmongImages.photo.data);
};

exports.singlehmongImage = (req, res) => {
    return res.json(req.hmongImages);
};