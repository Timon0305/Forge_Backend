const express = require('express');
const router = express.Router();

const {
    getCPUs
} = require('../../Controllers/admin/products/cpu');

const {registered} = require('../../middleware/auth');

router
    .route('/cpu')
    .get(registered, getCPUs);

module.exports = router;