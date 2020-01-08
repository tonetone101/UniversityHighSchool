exports.createFacultyValidator = (req, res, next) => {
    // title
    req.check('title', "Please write the title of faculty member").notEmpty()
    req.check('title', "title must be 4 to 150 characters").isLength({
        min: 4,
        max: 150
    })
    // name
    req.check('name', "Please write the name of faculty member").notEmpty()
    req.check('name', "name must be 4 to 150 characters").isLength({
        min: 4,
        max: 150
    })
    // about
    req.check('about', "Please write something about faculty member").notEmpty()
    req.check('about', "about section must be 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    })
    //check for errors
    const errors = req.validationErrors()
    // if error, show error as the happen
    if(errors) {
        const firstError = errors.map((error) => error.msg )[0]
        return res.status(400).json({ error: firstError})
    }
    next()
}

exports.createEventValidator = (req, res, next) => {
    // title
    req.check('title', "Please write the title of event").notEmpty()
    req.check('title', "title must be 4 to 150 characters").isLength({
        min: 4,
        max: 150
    })
    // name
    req.check('when', "Please write when the event will take place").notEmpty()
    req.check('when', "when must be 4 to 150 characters").isLength({
        min: 4,
        max: 150
    })
    // about
    req.check('where', "Please write a location").notEmpty()
    req.check('where', "location must be 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    })
    //check for errors
    const errors = req.validationErrors()
    // if error, show error as the happen
    if(errors) {
        const firstError = errors.map((error) => error.msg )[0]
        return res.status(400).json({ error: firstError})
    }
    next()
}

exports.createImageValidator = (req, res, next) => {
    // caption
    req.check('caption', "Please write the caption for image").notEmpty()
    req.check('caption', "caption must be 4 to 150 characters").isLength({
        min: 4,
        max: 150
    })
    //check for errors
    const errors = req.validationErrors()
    // if error, show error as the happen
    if(errors) {
        const firstError = errors.map((error) => error.msg )[0]
        return res.status(400).json({ error: firstError})
    }
    next()
}

exports.createCarouselValidator = (req, res, next) => {
    // caption
    req.check('missionStatement', "Please write the caption for image").notEmpty()
    req.check('missionStatement', "caption must be 4 to 150 characters").isLength({
        min: 4,
        max: 150
    })
    //check for errors
    const errors = req.validationErrors()
    // if error, show error as the happen
    if(errors) {
        const firstError = errors.map((error) => error.msg )[0]
        return res.status(400).json({ error: firstError})
    }
    next()
}


exports.createspanishCarouselValidator = (req, res, next) => {
    // caption
    req.check('missionStatement', "Por favor escriba el pie de foto").notEmpty()
    req.check('missionStatement', "el subtítulo debe tener de 4 a 150 caracteres").isLength({
        min: 4,
        max: 150
    })
    //check for errors
    const errors = req.validationErrors()
    // if error, show error as the happen
    if(errors) {
        const firstError = errors.map((error) => error.msg )[0]
        return res.status(400).json({ error: firstError})
    }
    next()
}

exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check('name', 'Name is required').notEmpty();
    // email is not null, valid and normalized
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.createPartnersValidator = (req, res, next) => {
    // name
    req.check('name', "Please write the name of partner or company").notEmpty()
    req.check('name', "name must be 4 to 150 characters").isLength({
        min: 4,
        max: 150
    })
    // about
    req.check('about', "Please write something about the partnership").notEmpty()
    req.check('about', "about section must be 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    })
    //check for errors
    const errors = req.validationErrors()
    // if error, show error as the happen
    if(errors) {
        const firstError = errors.map((error) => error.msg )[0]
        return res.status(400).json({ error: firstError})
    }
    next()
}

exports.userSigninValidator = (request, response, next) => {
    request
        .check('email', 'Email must be between 3 to 32 characters')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('Please type your valid email address')
        .isLength({
            min: 4,
            max: 32
        });
    request.check('password', 'Invalid Social Login Token!').notEmpty();
    request
        .check('password')
        .isLength({ min: 6 })
        .withMessage('Your social login token is invalid!');
    const errors = request.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check('newPassword', 'Password is required').notEmpty();
    req.check('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 chars long')
        .matches(
            /\d/
        )
        .withMessage('must contain a number')
        .withMessage('Password must contain a number');

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};

exports.createRegisterValidator = (req, res, next) => {
    // parentName
    req.check('parent', "Please write your name ").notEmpty()
    req.check('parent', "parentName must be at least 4 characters long").isLength({
        min: 4,
        max: 150
    })
    // name
    req.check('student', "Please write the student's Name").notEmpty()
    req.check('student', "student name must be at least 6 characters").isLength({
        min: 6,
        max: 150
    })
    req.check('birthday', "Please write the student's birthday").notEmpty()
    req.check('birthday', "student birthday must be at least 6 characters").isLength({
        min: 6,
        max: 150
    })
    req.check('contact', "Please add your contact information, via phone number or email").notEmpty()
    req.check('contact', "contact must be at least 7 characters").isLength({
        min: 7,
        max: 150
    })
    //check for errors
    const errors = req.validationErrors()
    // if error, show error as the happen
    if(errors) {
        const firstError = errors.map((error) => error.msg )[0]
        return res.status(400).json({ error: firstError})
    }
    next()
}

exports.createStudentValidator = (req, res, next) => {
    // parentName
    req.check('parent', "Please write your name ").notEmpty()
    req.check('parent', "parentName must be at least 4 characters long").isLength({
        min: 4,
        max: 150
    })
    // name
    req.check('student', "Please write the student's Name").notEmpty()
    req.check('student', "student name must be at least 6 characters").isLength({
        min: 6,
        max: 150
    })
    req.check('birthday', "Please write the student's birthday").notEmpty()
    req.check('birthday', "student birthday must be at least 6 characters").isLength({
        min: 6,
        max: 150
    })
    req.check('contact', "Please add your contact information, via phone number or email").notEmpty()
    req.check('contact', "contact must be at least 7 characters").isLength({
        min: 7,
        max: 150
    })
    //check for errors
    const errors = req.validationErrors()
    // if error, show error as the happen
    if(errors) {
        const firstError = errors.map((error) => error.msg )[0]
        return res.status(400).json({ error: firstError})
    }
    next()
}



