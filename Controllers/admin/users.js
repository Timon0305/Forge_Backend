const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
const UserSchema = require('../../Models/Users/User');
const asyncHandler = require('../../middleware/async');
const errorResponse = require('../../utils/errorResponse');

exports.register = asyncHandler(async (req, res, next) => {
    const {fullName, email, password} = req.body;
    try {
        const createdUser = await UserSchema.create({
            fullName,
            email,
            password
        });
        const salt = genSaltSync(10);
        createdUser.password = hashSync(createdUser.password, salt);

        await createdUser.save();
    } catch (e) {
        console.log('user error message=>>>>>>', e.message);
        return next(e)
    }
});

exports.login = asyncHandler(async (req, res,) => {
    const {email, password} = req.body;
    try {
        UserSchema.findOne({email: email})
            .then(userDetails => {
                if (!userDetails) {
                    res.status(404).json({
                        success: false,
                        data: null,
                        msg: errorResponse.StatusCode.EMAIL_NOT_VERIFIED
                    })
                } else {
                    const pwdCompare = compareSync(password, userDetails.password);
                    if (pwdCompare) {
                        const jsonToken = sign({result: userDetails}, 'forgePC', {
                            expiresIn: '1h'
                        });
                        return res.status(200).json({
                            success: true,
                            userDetails,
                            sessionToken: jsonToken
                        })
                    } else {
                        return res.status(401).json({
                            success: false,
                            msg: errorResponse.StatusCode.WRONG_PASSWORD
                        })
                    }
                }
            })

    } catch (e) {
        console.log(e.message)
    }
});
