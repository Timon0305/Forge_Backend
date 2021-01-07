const MotherboardSchema = require('../../../Models/Motherboard/Motherboard');
const MotherboardFilter = require('../../../Models/Motherboard/MotherboardFilter');
const MotherboardSocket = require('../../../Models/Motherboard/MotherboardSocket');
const MotherboardFactor = require('../../../Models/Motherboard/MotherboardFactor');
const MotherboardColor = require('../../../Models/Motherboard/MotherboardColor');

exports.getAllMotherboard = async (req, res) => {
    try {
        MotherboardSchema.find()
            .then(async motherboard => {
                await motherboard.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                res.status(200).json({
                    motherboard
                })
            })
    } catch (e) {
        console.log('motherboard exception---', e.message);
    }
} ;

exports.getMotherboardManufacturer = async (req, res) => {
    try {
        MotherboardFilter.find()
            .then(async manufacturer => {
                await res.status(200).json({
                    manufacturer
                })
            })
    }  catch (e) {
        console.log('Motherboard filter error', e.message)
    }
};

exports.getMotherboardSocket = async (req, res) => {
    try {
        MotherboardSocket.find()
            .then(async socket => {
                await res.status(200).json({
                    socket
                })
            })
    } catch (e) {
        console.log('Motherboard Socket Filter error', e.message)
    }
};

exports.getMotherboardFactor = async (req, res) => {
    try {
        MotherboardFactor.find()
            .then(async factor => {
                await res.status(200).json({
                    factor
                })
            })
    } catch (e) {
        console.log('Motherboard Factor error', e.message)
    }
};

exports.getMotherboardColor = async (req, res) => {
    try {
        MotherboardColor.find()
            .then(async color => {
                await res.status(200).json({
                    color
                })
            })
    } catch (e) {
        console.log('Motherboard Factor error', e.message)
    }
};

exports.filterMotherboard = async (req, res) => {
    const manufacturer = req.body.manufacturer;
    const fPrice = req.body.fPrice;
    const tPrice = req.body.tPrice;
    const socket = req.body.socket;
    const factor = req.body.factor;
    const fMemoryMax = req.body.fMemoryMax;
    const tMemoryMax = req.body.tMemoryMax;
    const color = req.body.color;
    console.log(manufacturer, fPrice, tPrice, socket, factor, fMemoryMax, tMemoryMax, color);

    try {
        MotherboardSchema.find()
            .then(async response => {
                let motherboard = [];
                for (let item of response) {
                    if (parseFloat(fPrice) <= parseFloat(item.price.split('$')[1]) &&
                        parseFloat(tPrice) >= parseFloat(item.price.split('$')[1]) &&
                        parseFloat(fMemoryMax) <= parseFloat(item.max.split(' ')[0]) &&
                        parseFloat(tMemoryMax) >= parseFloat(item.max.split(' ')[0])
                    ) {
                        if (manufacturer === 'All') {
                            if (socket === 'All' && factor === 'All' && color === 'All') {
                                motherboard = response;
                            }
                            else if (socket === 'All' && factor === 'All' && color === item.color) {
                                motherboard.push(item)
                            }
                            else if (socket === 'All' && factor === item.factor && color === 'All') {
                                motherboard.push(item)
                            }
                            else if (socket === item.socket && factor === 'All' && color === 'All') {
                                motherboard.push(item)
                            }
                            else if (socket === 'All' && factor === item.factor && color === item.color) {
                                motherboard.push(item)
                            }
                            else if (socket === item.socket && factor === 'All' && color === item.color) {
                                motherboard.push(item)
                            }
                            else if (socket === item.socket && factor === item.factor && color === item.color) {
                                motherboard.push(item)
                            }
                        } else if (item.name.includes(manufacturer)) {
                            if (socket === 'All' && factor === 'All' && color === 'All') {
                                motherboard.push(item)
                            }
                            else if (socket === 'All' && factor === 'All' && color === item.color) {
                                motherboard.push(item)
                            }
                            else if (socket === 'All' && factor === item.factor && color === 'All') {
                                motherboard.push(item)
                            }
                            else if (socket === item.socket && factor === 'All' && color === 'All') {
                                motherboard.push(item)
                            }
                            else if (socket === 'All' && factor === item.factor && color === item.color) {
                                motherboard.push(item)
                            }
                            else if (socket === item.socket && factor === 'All' && color === item.color) {
                                motherboard.push(item)
                            }
                            else if (socket === item.socket && factor === item.factor && color === item.color) {

                                motherboard.push(item)
                            }
                        }
                    }
                }
                await motherboard.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    motherboard
                })
            })
    } catch (e) {
        console.log('Motherboard filter exception', e.message);
    }
};