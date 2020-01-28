const KhmerPartners = require('../models/khmerPartners');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getPartners = (req, res, next) => {
   
    const partners = KhmerPartners.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id name about photo created")
        .sort({ created: -1 })
        .then(partners => {
           res.json(partners)
        })
        .catch(err => console.log(err));
      
};

exports.partnersById = (req, res, next, id) => {
    KhmerPartners.findById(id)
        // .populate("postedBy", "_id name photo role ")
        .select("_id name about photo created")
        .exec((err, partners) => {
            if (err || !partners) {
                return res.status(400).json({
                    error: err
                });
            }
            req.partners = partners;
            next();
        });
};

exports.createPartners = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let partners = new KhmerPartners(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        partners.postedBy = req.profile;
        if (files.photo) {
            partners.photo.data = fs.readFileSync(files.photo.path);
            partners.photo.contentType = files.photo.type;
        }
        partners.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatePartners = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let partners = req.partners;
        partners = _.extend(partners, fields);
        partners.updated = Date.now();

        if (files.photo) {
            partners.photo.data = fs.readFileSync(files.photo.path);
            partners.photo.contentType = files.photo.type;
        }

        partners.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(partners);
        });
    });
};

exports.deletePartners = (req, res) => {
    let partners = req.partners;
    partners.remove((err, partners) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'partner deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.partners.photo.contentType);
    return res.send(req.partners.photo.data);
};

exports.singlePartners = (req, res) => {
    return res.json(req.partners);
};

// exports.isAdmin = (req, res, next) => {
//     let sameUser = req.partners && req.auth && req.partners.postedBy._id == req.auth._id;
//     let adminUser = req.partners && req.auth && req.auth.role === 'admin';

//     console.log("req.partners ", req.partners, " req.auth ", req.auth);
//     console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

//     let isAdmin = sameUser || adminUser;

//     if (!isAdmin) {
//         return res.status(403).json({
//             error: 'User is not authorized'
//         });
//     }
//     next();
// };