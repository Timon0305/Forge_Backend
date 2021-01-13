const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const UserSchema = require('../Models/Users/User');
const { checkSession } = require('../utils/sessionLogger');

exports.registered = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.usertoken) {
        token = req.headers.usertoken;
    } else if (req.cookies.userToken) {
        token = req.cookies.userToken;
    }

    try {
        const decodedToken = jwt_decode(token);

        req.user = await UserSchema.findById(decodedToken.result.id);

        if (req.user.status === 'DELETED')
            return next(new ErrorResponse('403: User account deleted.', 403));

        next();
    } catch (err) {
        console.log('token, err=>>>>>>>>>>>>>>>>>', err.message);
        return next(new ErrorResponse('401: Unauthorized', 401));
    }
});

exports.verified = asyncHandler(async (req, res, next) => {
    if (!req.user.emailVerified)
        return next(new ErrorResponse('401: Account not verified', 401));
});
