const SpanishAbout = require('../models/spanishAbout');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.spanishaboutById = (req, res, next, id) => {
    SpanishAbout.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id body paragraph2 paragraph3 paragraph4 paragraph5 url created photo')
        .exec((err, spanishabout) => {
            if (err || !spanishabout) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishabout = spanishabout;
            next();
        });
};


exports.getspanishabouts = (req, res, next) => { 
    const spanishabouts = SpanishAbout.find()
        .populate("postedBy", "_id name photo role")
        .select("_id body paragraph2 paragraph3 paragraph4 paragraph5 url created photo")
        .sort({ created: -1 })
        .then(spanishabouts => {
           res.json(spanishabouts)
        })
        .catch(err => console.log(err));
      
};

exports.createspanishabout = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let spanishabout = new SpanishAbout(fields);

        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishabout.postedBy = req.profile;
        if (files.photo) {
            spanishabout.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            spanishabout.photo.contentType = files.photo.type;
        }
        spanishabout.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.spanishaboutsByUser = (req, res) => {
    SpanishAbout.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id body paragraph2 paragraph3 paragraph4 paragraph5 url photo created')
        .sort('_created')
        .exec((err, spanishabouts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishabouts);
        });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.spanishabout && req.auth && req.spanishabout.postedBy._id == req.auth._id;
    let adminUser = req.spanishabout && req.auth && req.auth.role === 'admin';

    console.log("req.spanishabout ", req.spanishabout, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};


exports.updatespanishabout = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let spanishabout = req.spanishabout;
        spanishabout = _.extend(spanishabout, fields);
        spanishabout.updated = Date.now();

        if (files.photo) {
            spanishabout.photo.data = fs.readFileSync(files.photo.path);
            spanishabout.photo.contentType = files.photo.type;
        }

        spanishabout.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishabout);
        });
    });
};

exports.deletespanishabout = (req, res) => {
    let spanishabout = req.spanishabout;
    spanishabout.remove((err, spanishabout) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Post deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.spanishabout.photo.contentType);
    return res.send(req.spanishabout.photo.data);
};

exports.singlespanishabout = (req, res) => {
    return res.json(req.spanishabout);
};



