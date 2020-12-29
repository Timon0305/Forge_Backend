const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
    cpuSync,
    memorySync,
    motherBoardSync,
    videoSync,
    powerSync,
    coolingSync,
    caseSync,
    storageSync,
    softwareSync,
} = require('../../Controllers/customer/synchronize/sync');

router
  .route('/cpu')
  .post( cpuSync);
router
    .route('/memory')
    .post(memorySync);
router
    .route('/motherboard')
    .post(motherBoardSync);
router
    .route('/video')
    .post(videoSync);
router
    .route('/power')
    .post(powerSync);
router
    .route('/cooling')
    .post(coolingSync);
router
    .route('/cases')
    .post(caseSync);
router
    .route('/storage')
    .post(storageSync);
router
    .route('/software')
    .post(softwareSync);
module.exports = router;


