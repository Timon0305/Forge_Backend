const express = require('express');
const router = express.Router();

const { getAllCpu } = require('../../Controllers/customer/category/cpu');
const {getAllMemory} = require('../../Controllers/customer/category/memory');
const {getAllMotherboard} = require('../../Controllers/customer/category/motherboard');
const {getAllVideo} = require('../../Controllers/customer/category/video');
const {getAllPowerSupply} = require('../../Controllers/customer/category/power');
const {getAllCPUCooler} = require('../../Controllers/customer/category/cooling');
const {getAllCases} = require('../../Controllers/customer/category/cases');
const {getAllStorage} = require('../../Controllers/customer/category/storage');
const {getAllSoftware} = require('../../Controllers/customer/category/software');

const {registered} = require('../../middleware/auth');

router
    .route('/cpu')
    .get(registered, getAllCpu);
router
    .route('/memory')
    .get(registered, getAllMemory);
router
    .route('/motherboard')
    .get(registered, getAllMotherboard);
router
    .route('/storage')
    .get(registered, getAllStorage);
router
    .route('/power-supply')
    .get(registered, getAllPowerSupply);
router
    .route('/video-card')
    .get(registered, getAllVideo);
router
    .route('/cpu-cooler')
    .get(registered, getAllCPUCooler);
router
    .route('/case')
    .get(registered, getAllCases);
router
    .route('/system')
    .get(registered, getAllSoftware);


module.exports = router;