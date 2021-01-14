const CoolingSchema = require('../../../Models/Cpu-Cooler/Cooling');
const CPUCoolerFilter = require('../../../Models/Cpu-Cooler/CoolingFilter');
const WaterCooled = require('../../../Models/Cpu-Cooler/WaterCooled');
const Fanless = require('../../../Models/Cpu-Cooler/FanLess');
const asyncHandler = require('../../../middleware/async');

exports.getAllCPUCooler = asyncHandler(async (req, res) => {
    try {
        CoolingSchema.find()
            .then(cooler => {
                res.status(200).json({
                    cooler
                })
            })
    } catch (e) {
        console.log('CPU Cooler exception---', e.message);
    }
});

exports.getCPUCoolerFilter = async (req, res) => {
    try {
        CPUCoolerFilter.find()
            .then(async coolerFilter => {
                await res.status(200).json({
                    coolerFilter
                })
            })
    }  catch (e) {
        console.log('cpu filter error', e.message)
    }
};

exports.getWaterCooled = async (req, res) => {
    try {
        WaterCooled.find()
            .then(async waterCooled => {
                await res.status(200).json({
                    waterCooled
                })
            })
    }  catch (e) {
        console.log('water cooled filter error', e.message)
    }
};

exports.getFanless = async (req, res) => {
    try {
        Fanless.find()
            .then(async fanLess => {
                await res.status(200).json({
                    fanLess
                })
            })
    }  catch (e) {
        console.log('water cooled filter error', e.message)
    }
};

exports.filterCPUCooler = async (req, res) => {
    const manufacturer = req.body.manufacturer;
    const cooled = req.body.cooled === 'All' ? 'All' : (req.body.cooled === 'No' ? undefined : req.body.cooled.split(' - ')[1]);
    const fanLess = req.body.fanLess;
    try {
        CoolingSchema.find()
            .then(async response => {
                let cooler = [];
                for (let item of response) {
                    if (fanLess === 'All') {
                        if (manufacturer === 'All' && cooled === 'All') {
                            cooler.push(item)
                        }
                        else if (manufacturer === item.name.split(' ')[0] && cooled === 'All') {
                            cooler.push(item)
                        }
                        else if (manufacturer === item.name.split(' ')[0] && cooled === item.radiator) {
                            cooler.push(item)
                        }
                        else if (manufacturer === 'All' && cooled === item.radiator) {
                            cooler.push(item)
                        }
                    }
                    else if (fanLess === 'Yes') {
                        if (manufacturer === 'All' && cooled === 'All' && item.rpm === undefined) {
                            cooler.push(item)
                        }
                        else if (manufacturer === item.name.split(' ')[0] && cooled === 'All' && item.rpm === undefined) {
                            cooler.push(item)
                        }
                        else if (manufacturer === item.name.split(' ')[0] && cooled === item.radiator && item.rpm === undefined) {
                            cooler.push(item)
                        }
                        else if (manufacturer === 'All' && cooled === item.radiator && item.rpm === undefined) {
                            cooler.push(item)
                        }
                    }
                    else if (fanLess === 'No') {
                        if (manufacturer === 'All' && cooled === 'All' && item.rpm !== undefined) {
                            cooler.push(item)
                        }
                        else if (manufacturer === item.name.split(' ')[0] && cooled === 'All' && item.rpm !== undefined) {
                            cooler.push(item)
                        }
                        else if (manufacturer === item.name.split(' ')[0] && cooled === item.radiator && item.rpm !== undefined) {
                            cooler.push(item)
                        }
                        else if (manufacturer === 'All' && cooled === item.radiator && item.rpm !== undefined) {
                            cooler.push(item)
                        }
                    }
                }
                await cooler.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    cooler
                })
            })
    } catch (e) {
        console.log('CPU Cooler filter exception', e.message);
    }
};