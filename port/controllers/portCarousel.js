const portCarousel = require('../models/portCarousel');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getportCarousel = (req, res, next) => {
   
    const portCarousel = PortCarousel.find()
        .populate("postedBy", "_id name photo role ")
        .select("_id caption1 photo1 caption2 photo2 caption3 photo3 missionStatement created")
        .sort({ created: -1 })
        .then(portCarousel => {
           res.json(portCarousel)
        })
        .catch(err => console.log(err));
      
};

exports.portCarouselById = (req, res, next, id) => {
    PortCarousel.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption1 photo1 caption2 photo2 caption3 photo3 missionStatement created")
        .exec((err, portCarousel) => {
            if (err || !portCarousel) {
                return res.status(400).json({
                    error: err
                });
            }
            req.portCarousel = portCarousel;
            next();
        });
};

exports.createportCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let portCarousel = new PortCarousel(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        portCarousel.postedBy = req.profile;
        if (files.photo) {
            portCarousel.photo.data = fs.readFileSync(files.photo.path);
            portCarousel.photo.contentType = files.photo.type;
        }
        portCarousel.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateportCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let portCarousel = req.portCarousel;
        portCarousel = _.extend(portCarousel, fields);
        portCarousel.updated = Date.now();

        if (files.photo) {
            portCarousel.photo.data = fs.readFileSync(files.photo.path);
            portCarousel.photo.contentType = files.photo.type;
        }

        portCarousel.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(portCarousel);
        });
    });
};

exports.deleteportCarousel = (req, res) => {
    let portCarousel = req.portCarousel;
    portCarousel.remove((err, portCarousel) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'portCarousel deleted successfully'
        });
    });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.portCarousel && req.auth && req.portCarousel.postedBy._id == req.auth._id;
    let adminUser = req.portCarousel && req.auth && req.auth.role === 'admin';

    console.log("req.portCarousel ", req.portCarousel, " req.auth ", req.auth);
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
    res.set('Content-Type', req.portCarousel.photo1.contentType);
    return res.send(req.portCarousel.photo1.data);
};

exports.photo2 = (req, res, next) => {
    res.set('Content-Type', req.portCarousel.photo2.contentType);
    return res.send(req.portCarousel.photo1.data);
};

exports.photo3 = (req, res, next) => {
    res.set('Content-Type', req.portCarousel.photo3.contentType);
    return res.send(req.portCarousel.photo3.data);
};

exports.singleportCarousel = (req, res) => {
    return res.json(req.portCarousel);
};