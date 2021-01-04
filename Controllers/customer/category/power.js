const PowerSchema = require('../../../Models/Power-Supply/Power');
const PowerSupplyFilter = require('../../../Models/Power-Supply/PowerFilter');
exports.getAllPowerSupply = async (req, res) => {
    try {
        PowerSchema.find()
            .then(power => {
                res.status(200).json({
                    power
                })
            })
    } catch (e) {
        console.log('Power exception---', e.message);
    }
} ;

exports.getPowerSupplyFilter = async (req, res) => {
    try {
        PowerSupplyFilter.find()
            .then(async powerFilter => {
                await res.status(200).json({
                    powerFilter
                })
            })
    }  catch (e) {
        console.log('power supply filter error', e.message)
    }
};

exports.filterPowerSupply = async (req, res) => {
    const filter = req.body.filter;
    try {
        PowerSchema.find()
            .then(async response => {
                let power = [];
                for (let item of response) {
                    if (item.name.split(' ')[0] === filter) {
                        power.push(item)
                    }
                    if (filter === 'All') {
                        power = response
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