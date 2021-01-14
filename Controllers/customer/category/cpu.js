const CpuSchema = require('../../../Models/CPU/Cpu');
const CPUFilter = require('../../../Models/CPU/CpuFilter');
const CPUSeries = require('../../../Models/CPU/CpuSeries');
const CPUGraphics = require('../../../Models/CPU/CpuGraphics');
const asyncHandler = require('../../../middleware/async');
exports.getAllCpu = asyncHandler(async (req, res) => {
    try {
        CpuSchema.find()
            .then(async cpu => {
                await cpu.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    cpu
                })

            })
    } catch (e) {
        console.log('cpu exception---', e.message);
    }
});

exports.getCPUManufacturer = async (req, res) => {
    try {
        CPUFilter.find()
            .then(async manufacturer => {
                await res.status(200).json({
                    manufacturer
                })
            })
    }  catch (e) {
        console.log('cpu filter error', e.message)
    }
};

exports.getCPUSeries = async (req, res) => {
    try {
        CPUSeries.find()
            .then(async series => {
                await res.status(200).json({
                    series
                })
            })
    }  catch (e) {
        console.log('cpu series error', e.message)
    }
};

exports.getCPUGraphics = async (req, res) => {
    try {
        CPUGraphics.find()
            .then(async graphics => {
                await res.status(200).json({
                    graphics
                })
            })
    } catch (e) {
        console.log('cpu integrated graphics error', e.message)
    }
};

exports.filterCpu = async (req, res) => {
    const manufacturer = req.body.manufacturer;
    const series = req.body.series;
    const fCount = req.body.fCount;
    const tCount = req.body.tCount;
    const fClock = req.body.fClock;
    const tClock = req.body.tClock;
    const graphics = req.body.graphics;
    try {
        CpuSchema.find()
            .then(async response => {
                let cpu = [];
                for (let item of response) {
                    if (parseFloat(fCount) <= parseFloat(item.coreCount) &&
                        parseFloat(tCount) >= parseFloat(item.coreCount) &&
                        parseFloat(fClock) <= parseFloat(item.coreClock.split(' ')[0]) &&
                        parseFloat(tClock) >= parseFloat(item.coreClock.split(' ')[0])
                    ) {
                        if (manufacturer === 'All') {
                            if (series === 'All' && graphics === 'All') {
                                cpu.push(item)
                            }
                            else if (series === 'All' && graphics === item.graphics) {
                                cpu.push(item)
                            }
                            else if (item.name.includes(series) && graphics === 'All') {
                                cpu.push(item)
                            }
                            else if (item.name.includes(series) && graphics === item.graphics) {
                                cpu.push(item)
                            }
                        }
                        else if (item.name.includes(manufacturer)) {
                            if (series === 'All' && graphics === 'All') {
                                cpu.push(item)
                            }
                            else if (series === 'All' && graphics === item.graphics) {
                                cpu.push(item)
                            }
                            else if (item.name.includes(series) && graphics === 'All') {
                                cpu.push(item)
                            }
                            else if (item.name.includes(series) && graphics === item.graphics) {
                                cpu.push(item)
                            }
                        }
                    }
                }
                await cpu.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    cpu
                })
            })
    } catch (e) {
        console.log('cpu filter exception', e.message);
    }
};