const PowerSchema = require('../../../Models/Power-Supply/Power');
const PowerSupplyFilter = require('../../../Models/Power-Supply/PowerFilter');
const PowerEfficiency = require('../../../Models/Power-Supply/PowerEfficiency');
const PowerModular = require('../../../Models/Power-Supply/PowerModular');
const PowerColor = require('../../../Models/Power-Supply/PowerColor');

exports.getAllPowerSupply = async (req, res) => {
    try {
        PowerSchema.find()
            .then(async power => {
                await power.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                res.status(200).json({
                    power
                })
            })
    } catch (e) {
        console.log('Power exception---', e.message);
    }
} ;

exports.getPowerSupplyManufacturer = async (req, res) => {
    try {
        PowerSupplyFilter.find()
            .then(async manufacturer => {
                await res.status(200).json({
                    manufacturer
                })
            })
    }  catch (e) {
        console.log('power supply manufacturer error', e.message)
    }
};

exports.getPowerSupplyEfficiency = async (req, res) => {
    try {
        PowerEfficiency.find()
            .then(async efficiency => {
                await res.status(200).json({
                    efficiency
                })
            })
    }  catch (e) {
        console.log('power supply efficiency error', e.message)
    }
};

exports.getPowerSupplyModular = async (req, res) => {
    try {
        PowerModular.find()
            .then(async modular => {
                await res.status(200).json({
                    modular
                })
            })
    }  catch (e) {
        console.log('power supply modular error', e.message)
    }
};

exports.getPowerSupplyColor = async (req, res) => {
    try {
        PowerColor.find()
            .then(async color => {
                await res.status(200).json({
                    color
                })
            })
    }  catch (e) {
        console.log('power supply color error', e.message)
    }
};

exports.filterPowerSupply = async (req, res) => {
    const manufacturer = req.body.manufacturer;
    const fPrice = req.body.fPrice;
    const tPrice = req.body.tPrice;
    const efficiency = req.body.efficiency;
    const fWattage = req.body.fWattage;
    const tWattage = req.body.tWattage;
    const modular = req.body.modular;
    const color = req.body.color;
    try {
        PowerSchema.find()
            .then(async response => {
                let power = [];
                for (let item of response) {
                    if (parseFloat(fPrice) <= parseFloat(item.price.split('$')[1]) &&
                        parseFloat(tPrice) >= parseFloat(item.price.split('$')[1]) &&
                        parseFloat(fWattage) <= parseFloat(item.wattage.split(' ')[0]) &&
                        parseFloat(tWattage) >= parseFloat(item.wattage.split(' ')[0])) {
                        if (manufacturer === 'All') {
                            if (efficiency === 'All' && modular === 'All' && color === 'All') {
                                power.push(item)
                            }
                            else if (efficiency === 'All' && modular === 'All' && color === item.color) {
                                power.push(item)
                            }
                            else if (efficiency === 'All' && modular === item.modular && color === 'All') {
                                power.push(item)
                            }
                            else if (efficiency === item.efficiency && modular === 'All' && color === 'All') {
                                power.push(item)
                            }
                            else if (efficiency === 'All' && modular === item.modular && color === item.color) {
                                power.push(item)
                            }
                            else if (efficiency === item.efficiency && modular === 'All' && color === item.color) {
                                power.push(item)
                            }
                            else if (efficiency === item.efficiency && modular === item.modular && color === 'All') {
                                power.push(item)
                            }
                            else if (efficiency === item.efficiency && modular === item.modular && color === item.color) {
                                power.push(item)
                            }
                        }
                        else if (item.name.includes(manufacturer)) {
                            if (efficiency === 'All' && modular === 'All' && color === 'All') {
                                power.push(item)
                            }
                            else if (efficiency === 'All' && modular === 'All' && color === item.color) {
                                power.push(item)
                            }
                            else if (efficiency === 'All' && modular === item.modular && color === 'All') {
                                power.push(item)
                            }
                            else if (efficiency === item.efficiency && modular === 'All' && color === 'All') {
                                power.push(item)
                            }
                            else if (efficiency === 'All' && modular === item.modular && color === item.color) {
                                power.push(item)
                            }
                            else if (efficiency === item.efficiency && modular === 'All' && color === item.color) {
                                power.push(item)
                            }
                            else if (efficiency === item.efficiency && modular === item.modular && color === 'All') {
                                power.push(item)
                            }
                            else if (efficiency === item.efficiency && modular === item.modular && color === item.color) {
                                power.push(item)
                            }
                        }
                    }
                }
                await power.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    power
                })
            })
    } catch (e) {
        console.log('Power Supply filter exception', e.message);
    }
};