const express = require('express');
const router = express.Router();

const {
    getCPUFilter
} = require('../../Controllers/customer/category/cpu');
const {
    getMemoryFilter
} = require('../../Controllers/customer/category/memory');
const {
    getMotherboardFilter
} = require('../../Controllers/customer/category/motherboard');
const {
    getVideoCardFilter
} = require('../../Controllers/customer/category/video');
const {
    getPowerSupplyFilter
} = require('../../Controllers/customer/category/power');
const {
    getCPUCoolerFilter
} = require('../../Controllers/customer/category/cooling');
const {
    getStorageFilter
} = require('../../Controllers/customer/category/storage');
const {
    getCaseFilter
} = require('../../Controllers/customer/category/cases');

router
    .route('/cpu')
    .get(getCPUFilter);
router
    .route('/memory')
    .get(getMemoryFilter);
router
    .route('/motherboard')
    .get(getMotherboardFilter);
router
    .route('/video-card')
    .get(getVideoCardFilter);
router
    .route('/power-supply')
    .get(getPowerSupplyFilter);
router
    .route('/cpu-cooler')
    .get(getCPUCoolerFilter);
router
    .route('/storage')
    .get(getStorageFilter);
router
    .route('/case')
    .get(getCaseFilter);

module.exports = router;