const Register = require('../models/register');
const _ = require('lodash');

exports.getRegisters = (req, res, next) => {
   const register = Register.find()
        .select("_id parentName studentName studentBitrthday studentRace genderIdentity contact created")
        .sort({ created: -1 })
        .then(register => {
           res.json(register)
        })
        .catch(err => console.log(err));
      
};

exports.registerById = (req, res, next, id) => {
   Register.findById(id)
   .select("_id parentName studentName studentBitrthday studentRace genderIdentity contact created")
   .exec((err, register) => {
            if (err || !register) {
                return res.status(400).json({
                    error: err
                });
            }
            req.register = register;
            next();
        });
};

exports.createRegister = (req, res, next) => {
        let register = new Register(req.body);
        register.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
};

exports.updateRegister = (req, res, next) => {
    let register = req.register;
    register = _.extend(register, req.body);
    register.updated = Date.now();
    register.save(err => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(register);
    });
};

exports.deleteRegister = (req, res) => {
    let register = req.register;
    register.remove((err, register) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'register deleted successfully'
        });
    });
};

exports.singleRegister = (req, res) => {
    return res.json(req.register);
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.faculty && req.auth && req.faculty.postedBy._id == req.auth._id;
    let adminUser = req.faculty && req.auth && req.auth.role === 'admin';

    console.log("req.faculty ", req.faculty, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};
