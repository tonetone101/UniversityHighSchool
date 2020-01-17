const SpanishCarousel = require('../models/spanishCarousel');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getspanishCarousel = (req, res, next) => {
   
    const spanishCarousel = SpanishCarousel.find()
        .populate("postedBy", "_id name photo role ")
        .select("_id caption1 caption2 caption3 caption4 caption5 caption6 missionStatement link1 link2 link3 linkTitle1 linkTitle2 linkTitle3 doc1 doc2 doc3 created")
        .sort({ created: -1 })
        .then(spanishCarousel => {
           res.json(spanishCarousel)
        })
        .catch(err => console.log(err));
      
};

exports.spanishCarouselById = (req, res, next, id) => {
    SpanishCarousel.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption1 caption2 caption3 caption4 caption5 caption6 missionStatement link1 link2 link3 linkTitle1 linkTitle2 linkTitle3 doc1 doc2 doc3 created")
        .exec((err, spanishCarousel) => {
            if (err || !spanishCarousel) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishCarousel = spanishCarousel;
            next();
        });
};

exports.createspanishCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let spanishCarousel = new SpanishCarousel(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishCarousel.postedBy = req.profile;
        if (files.photo) {
            spanishCarousel.photo.data = fs.readFileSync(files.photo.path);
            spanishCarousel.photo.contentType = files.photo.type;
        }
        spanishCarousel.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatespanishCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let spanishCarousel = req.spanishCarousel;
        spanishCarousel = _.extend(spanishCarousel, fields);
        spanishCarousel.updated = Date.now();

        if (files.photo) {
            spanishCarousel.photo.data = fs.readFileSync(files.photo.path);
            spanishCarousel.photo.contentType = files.photo.type;
        }

        spanishCarousel.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishCarousel);
        });
    });
};

exports.deletespanishCarousel = (req, res) => {
    let spanishCarousel = req.spanishCarousel;
    spanishCarousel.remove((err, spanishCarousel) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'spanishCarousel deleted successfully'
        });
    });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.spanishCarousel && req.auth && req.spanishCarousel.postedBy._id == req.auth._id;
    let adminUser = req.spanishCarousel && req.auth && req.auth.role === 'admin';

    console.log("req.spanishCarousel ", req.spanishCarousel, " req.auth ", req.auth);
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
    res.set('Content-Type', req.spanishCarousel.photo1.contentType);
    return res.send(req.spanishCarousel.photo1.data);
};

exports.photo2 = (req, res, next) => {
    res.set('Content-Type', req.spanishCarousel.photo2.contentType);
    return res.send(req.spanishCarousel.photo1.data);
};

exports.photo3 = (req, res, next) => {
    res.set('Content-Type', req.spanishCarousel.photo3.contentType);
    return res.send(req.spanishCarousel.photo3.data);
};

exports.singlespanishCarousel = (req, res) => {
    return res.json(req.spanishCarousel);
};