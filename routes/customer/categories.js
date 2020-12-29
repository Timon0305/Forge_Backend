const express = require('express');
const router = express.Router();

const {
    getAllCpu,
    filterCpu,
}  = require('../../Controllers/customer/category/cpu');
const {
    getAllMemory,
    filterMemory,
} = require('../../Controllers/customer/category/memory');
const {
    getAllMotherboard,
    filterMotherboard
} = require('../../Controllers/customer/category/motherboard');
const {
    getAllVideo,
    filterVideoCard
} = require('../../Controllers/customer/category/video');
const {
    getAllPowerSupply,
    filterPowerSupply
} = require('../../Controllers/customer/category/power');
const {
    getAllCPUCooler,
    filterCPUCooler
} = require('../../Controllers/customer/category/cooling');
const {
    getAllCases,
    filterCases
} = require('../../Controllers/customer/category/cases');
const {
    getAllStorage,
    filterStorage
} = require('../../Controllers/customer/category/storage');
const {
    getAllSoftware,
    filterSoftware
} = require('../../Controllers/customer/category/software');

router
    .route('/cpu')
    .get(getAllCpu)
    .post(filterCpu);
router
    .route('/memory')
    .get(getAllMemory)
    .post(filterMemory);
router
    .route('/motherboard')
    .get(getAllMotherboard)
    .post(filterMotherboard);
router
    .route('/video-card')
    .get(getAllVideo)
    .post(filterVideoCard);
router
    .route('/power-supply')
    .get(getAllPowerSupply)
    .post(filterPowerSupply);
router
    .route('/cpu-cooler')
    .get(getAllCPUCooler)
    .post(filterCPUCooler);
router
    .route('/case')
    .get(getAllCases)
    .post(filterCases);
router
    .route('/storage')
    .get(getAllStorage)
    .post(filterStorage);
router
    .route('/software')
    .get(getAllSoftware)
    .post(filterSoftware);

module.exports = router;
