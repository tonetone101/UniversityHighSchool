const Faculty = require('../models/faculty');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getFaculty = (req, res, next) => {
   
    const faculty = Faculty.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id title name about created")
        .sort({ created: -1 })
        .then(faculty => {
           res.json(faculty)
        })
        .catch(err => console.log(err));
      
};

exports.facultyById = (req, res, next, id) => {
    Faculty.findById(id)
        .populate('postedBy', '_id name role')
        .select('_id title name about created photo')
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

exports.createFaculty = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let faculty = new Faculty(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        faculty.postedBy = req.profile;
        if (files.photo) {
            faculty.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            faculty.photo.contentType = files.photo.type;
        }
        faculty.save((err, result) => {
            res.json(result);
        });
    });
};

// exports.createFaculty = (req, res) => {
//     const faculty = new Faculty(req.body)
//     console.log('creating faculty member:', faculty)
//     faculty.save((err, result) => {
//         res.status(200).json(result)
//     })
// }