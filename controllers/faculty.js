const Faculty = require('../models/faculty');

exports.getFaculty = (req, res) => {
    res.json({
        faculty: [{title: 'teacher'}, {title: 'teacher-assistant'}]
    })
}

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
    console.log(req)
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
        console.log(faculty)
        if (files.photo) {
            faculty.photo.data = fs.readFileSync(files.photo.path, 'utf8');
            faculty.photo.contentType = files.photo.type;
        }
        faculty.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};