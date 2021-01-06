const express = require('express');
const router = express.Router();

const {
    getCPUFilter,
    getCPUGraphics
} = require('../../Controllers/customer/category/cpu');

const {
    getMemoryManufacturer,
    getMemoryModule,
    getMemoryColor
} = require('../../Controllers/customer/category/memory');

const {
    getMotherboardManufacturer,
    getMotherboardSocket,
    getMotherboardFactor,
    getMotherboardColor,
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
    getWaterCooled
} = require('../../Controllers/customer/category/cooling');
const {
    getFanless
} = require('../../Controllers/customer/category/cooling');

const {
    getStorageManufacturer,
    getStorageType,
    getStorageFactor
} = require('../../Controllers/customer/category/storage');

const {
    getCaseFilter
} = require('../../Controllers/customer/category/cases');

router
    .route('/cpu')
    .get(getCPUFilter);
router
    .route('/cpuGraphics')
    .get(getCPUGraphics);

router
    .route('/memory')
    .get(getMemoryManufacturer);
router
    .route('/memoryModule')
    .get(getMemoryModule);
router
    .route('/memoryColor')
    .get(getMemoryColor);

router
    .route('/motherboard')
    .get(getMotherboardManufacturer);
router
    .route('/motherboardSocket')
    .get(getMotherboardSocket);
router
    .route('/motherboardFactor')
    .get(getMotherboardFactor);
router
    .route('/motherboardColor')
    .get(getMotherboardColor);

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
    .route('/water-cooled')
    .get(getWaterCooled);
router
    .route('/fanless')
    .get(getFanless);

router
    .route('/storage')
    .get(getStorageManufacturer);
router
    .route('/storageType')
    .get(getStorageType);
router
    .route('/storageFactor')
    .get(getStorageFactor);

router
    .route('/case')
    .get(getCaseFilter);

module.exports = router;