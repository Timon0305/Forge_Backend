const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const UserSchema = require('../Models/Users/User');
const { checkSession } = require('../utils/sessionLogger');

exports.registered = asyncHandler(async (req, res, next) => {
    let token;
    // return next();

    console.log('my token=>', req.headers.usertoken)

    if (req.headers.usertoken) {
        token = req.headers.usertoken;
    } else if (req.cookies.userToken) {
        token = req.cookies.userToken;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const isValidated = await checkSession(req, token);

        if (!isValidated === true) {
            return next(new ErrorResponse('Invalid Session', 401));
        }

        req.user = await UserSchema.findById(decodedToken.id);

        if (req.user.status === 'DELETED')
            return next(new ErrorResponse('403: User account deleted.', 403));

        next();
    } catch (err) {
        console.log('token, err=>>>>>>>>>>>>>>>>>', err.message)
        return next(new ErrorResponse('401: Unauthorized', 401));
    }
});

exports.verified = asyncHandler(async (req, res, next) => {
    if (!req.user.emailVerified)
        return next(new ErrorResponse('401: Account not verified', 401));
});
