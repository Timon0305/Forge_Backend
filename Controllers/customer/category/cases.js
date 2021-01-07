const CasesSchema = require('../../../Models/Case/Cases');
const CaseFilterSchema = require('../../../Models/Case/CaseFilter');
const CaseType = require('../../../Models/Case/CaseType');
const CaseColor = require('../../../Models/Case/CaseColor');
const CasePowerSupply = require('../../../Models/Case/CasePowerSupply');
const CaseWindow = require('../../../Models/Case/CaseWindow');

exports.getAllCases = async (req, res) => {
    try {
        CasesSchema.find()
            .then(async cases => {
                await cases.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                res.status(200).json({
                    cases
                })
            })
    } catch (e) {
        console.log('Cases exception---', e.message);
    }
} ;

exports.getCaseManufacturer = async (req, res) => {
    try {
        CaseFilterSchema.find()
            .then(async manufacturer => {
                await res.status(200).json({
                    manufacturer
                })
            })
    }  catch (e) {
        console.log('Case Manufacturer error', e.message)
    }
};

exports.getCaseType = async (req, res) => {
    try {
        CaseType.find()
            .then(async type => {
                await res.status(200).json({
                    type
                })
            })
    }  catch (e) {
        console.log('Case Type error', e.message)
    }
};

exports.getCaseColor = async (req, res) => {
    try {
        CaseColor.find()
            .then(async color => {
                await res.status(200).json({
                    color
                })
            })
    }  catch (e) {
        console.log('Case Color error', e.message)
    }
};

exports.getCasePowerSupply = async (req, res) => {
    try {
        CasePowerSupply.find()
            .then(async powerSupply => {
                await res.status(200).json({
                    powerSupply
                })
            })
    }  catch (e) {
        console.log('Case Power Supply error', e.message)
    }
};

exports.getCaseWindow = async (req, res) => {
    try {
        CaseWindow.find()
            .then(async window => {
                await res.status(200).json({
                    window
                })
            })
    }  catch (e) {
        console.log('Case Window error', e.message)
    }
};

exports.filterCases = async (req, res) => {
    const manufacturer = req.body.manufacturer;
    const fPrice = req.body.fPrice;
    const tPrice = req.body.tPrice;
    const type = req.body.type;
    const color = req.body.color;
    const powerSupply = req.body.powerSupply;
    const window = req.body.window;
    try {
        CasesSchema.find()
            .then(async response => {
                let cases = [];
                for (let item of response) {
                    if (parseFloat(fPrice) <= parseFloat(item.price.split('$')[1]) &&
                        parseFloat(tPrice) >= parseFloat(item.price.split('$')[1])) {
                        if (manufacturer === 'All') {
                            if (type === 'All' && color === 'All' && powerSupply === 'All' && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === 'All' && powerSupply === 'All' && window === item.side) {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === 'All' && powerSupply === item.power && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === item.color && powerSupply === 'All' && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === item.type && color === 'All' && powerSupply === 'All' && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === 'All' && powerSupply === item.power && window === item.side) {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === item.color && powerSupply === 'All' && window === item.side) {
                                cases.push(item)
                            }
                            else if (type === item.type && color === 'All' && powerSupply === 'All' && window === item.side) {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === item.color && powerSupply === item.power && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === item.type && color === 'All' && powerSupply === item.power && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === item.type && color === item.color && powerSupply === 'All' && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === item.color && powerSupply === item.power && window === item.window) {
                                cases.push(item)
                            }
                            else if (type === item.type && color === 'All' && powerSupply === item.power && window === item.window) {
                                cases.push(item)
                            }
                            else if (type === item.type && color === item.color && powerSupply === 'All' && window === item.window) {
                                cases.push(item)
                            }
                            else if (type === item.type && color === item.color && powerSupply === item.power && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === item.type && color === item.color && powerSupply === item.power && window === item.window) {
                                cases.push(item)
                            }
                        }
                        else if (item.name.includes(manufacturer)) {
                            if (type === 'All' && color === 'All' && powerSupply === 'All' && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === 'All' && powerSupply === 'All' && window === item.side) {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === 'All' && powerSupply === item.power && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === item.color && powerSupply === 'All' && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === item.type && color === 'All' && powerSupply === 'All' && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === 'All' && powerSupply === item.power && window === item.side) {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === item.color && powerSupply === 'All' && window === item.side) {
                                cases.push(item)
                            }
                            else if (type === item.type && color === 'All' && powerSupply === 'All' && window === item.side) {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === item.color && powerSupply === item.power && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === item.type && color === 'All' && powerSupply === item.power && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === item.type && color === item.color && powerSupply === 'All' && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === 'All' && color === item.color && powerSupply === item.power && window === item.window) {
                                cases.push(item)
                            }
                            else if (type === item.type && color === 'All' && powerSupply === item.power && window === item.window) {
                                cases.push(item)
                            }
                            else if (type === item.type && color === item.color && powerSupply === 'All' && window === item.window) {
                                cases.push(item)
                            }
                            else if (type === item.type && color === item.color && powerSupply === item.power && window === 'All') {
                                cases.push(item)
                            }
                            else if (type === item.type && color === item.color && powerSupply === item.power && window === item.window) {
                                cases.push(item)
                            }
                        }
                    }
                }
                await cases.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    cases
                })
            })
    } catch (e) {
        console.log('Case filter exception', e.message);
    }
};