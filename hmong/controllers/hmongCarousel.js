const hmongCarousel = require('../models/hmongCarousel');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.gethmongCarousel = (req, res, next) => {
   
    const hmongCarousel = HmongCarousel.find()
        .populate("postedBy", "_id name photo role ")
        .select("_id caption1 photo1 caption2 photo2 caption3 photo3 missionStatement created")
        .sort({ created: -1 })
        .then(hmongCarousel => {
           res.json(hmongCarousel)
        })
        .catch(err => console.log(err));
      
};

exports.hmongCarouselById = (req, res, next, id) => {
    HmongCarousel.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption1 photo1 caption2 photo2 caption3 photo3 missionStatement created")
        .exec((err, hmongCarousel) => {
            if (err || !hmongCarousel) {
                return res.status(400).json({
                    error: err
                });
            }
            req.hmongCarousel = hmongCarousel;
            next();
        });
};

exports.createhmongCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let hmongCarousel = new HmongCarousel(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        hmongCarousel.postedBy = req.profile;
        if (files.photo) {
            hmongCarousel.photo.data = fs.readFileSync(files.photo.path);
            hmongCarousel.photo.contentType = files.photo.type;
        }
        hmongCarousel.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatehmongCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let hmongCarousel = req.hmongCarousel;
        hmongCarousel = _.extend(hmongCarousel, fields);
        hmongCarousel.updated = Date.now();

        if (files.photo) {
            hmongCarousel.photo.data = fs.readFileSync(files.photo.path);
            hmongCarousel.photo.contentType = files.photo.type;
        }

        hmongCarousel.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(hmongCarousel);
        });
    });
};

exports.deletehmongCarousel = (req, res) => {
    let hmongCarousel = req.hmongCarousel;
    hmongCarousel.remove((err, hmongCarousel) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'hmongCarousel deleted successfully'
        });
    });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.hmongCarousel && req.auth && req.hmongCarousel.postedBy._id == req.auth._id;
    let adminUser = req.hmongCarousel && req.auth && req.auth.role === 'admin';

    console.log("req.hmongCarousel ", req.hmongCarousel, " req.auth ", req.auth);
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
    res.set('Content-Type', req.hmongCarousel.photo1.contentType);
    return res.send(req.hmongCarousel.photo1.data);
};

exports.photo2 = (req, res, next) => {
    res.set('Content-Type', req.hmongCarousel.photo2.contentType);
    return res.send(req.hmongCarousel.photo1.data);
};

exports.photo3 = (req, res, next) => {
    res.set('Content-Type', req.hmongCarousel.photo3.contentType);
    return res.send(req.hmongCarousel.photo3.data);
};

exports.singlehmongCarousel = (req, res) => {
    return res.json(req.hmongCarousel);
};