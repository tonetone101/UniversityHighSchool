const KhmerCarousel = require('../models/khmerCarousel');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getkhmerCarousel = (req, res, next) => {
   
    const khmerCarousel = KhmerCarousel.find()
        .populate("postedBy", "_id name photo role ")
        .select("_id caption1 caption2 caption3 caption4 caption5 caption6 missionStatement link1 link2 link3 linkTitle1 linkTitle2 linkTitle3 doc1 doc2 doc3 created")
        .sort({ created: -1 })
        .then(khmerCarousel => {
           res.json(khmerCarousel)
        })
        .catch(err => console.log(err));
      
};

exports.khmerCarouselById = (req, res, next, id) => {
    KhmerCarousel.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption1 caption2 caption3 caption4 caption5 caption6 missionStatement link1 link2 link3 linkTitle1 linkTitle2 linkTitle3 doc1 doc2 doc3 created")
        .exec((err, khmerCarousel) => {
            if (err || !khmerCarousel) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerCarousel = khmerCarousel;
            next();
        });
};

exports.createkhmerCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let khmerCarousel = new KhmerCarousel(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmerCarousel.postedBy = req.profile;
        if (files.photo) {
            khmerCarousel.photo.data = fs.readFileSync(files.photo.path);
            khmerCarousel.photo.contentType = files.photo.type;
        }
        khmerCarousel.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatekhmerCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let khmerCarousel = req.khmerCarousel;
        khmerCarousel = _.extend(khmerCarousel, fields);
        khmerCarousel.updated = Date.now();

        if (files.photo) {
            khmerCarousel.photo.data = fs.readFileSync(files.photo.path);
            khmerCarousel.photo.contentType = files.photo.type;
        }

        khmerCarousel.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerCarousel);
        });
    });
};

exports.deletekhmerCarousel = (req, res) => {
    let khmerCarousel = req.khmerCarousel;
    khmerCarousel.remove((err, khmerCarousel) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'khmerCarousel deleted successfully'
        });
    });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.khmerCarousel && req.auth && req.khmerCarousel.postedBy._id == req.auth._id;
    let adminUser = req.khmerCarousel && req.auth && req.auth.role === 'admin';

    console.log("req.khmerCarousel ", req.khmerCarousel, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.photo1 = (req, res, next) => {
    res.set('Content-Type', req.khmerCarousel.photo1.contentType);
    return res.send(req.khmerCarousel.photo1.data);
};

exports.photo2 = (req, res, next) => {
    res.set('Content-Type', req.khmerCarousel.photo2.contentType);
    return res.send(req.khmerCarousel.photo1.data);
};

exports.photo3 = (req, res, next) => {
    res.set('Content-Type', req.khmerCarousel.photo3.contentType);
    return res.send(req.khmerCarousel.photo3.data);
};

exports.singlekhmerCarousel = (req, res) => {
    return res.json(req.khmerCarousel);
};