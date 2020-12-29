const CoolingSchema = require('../../../Models/Category/Cooling');
const CPUCoolerFilter = require('../../../Models/Filter/CoolingFilter');
exports.getAllCPUCooler = async (req, res) => {
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
} ;

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

exports.filterCPUCooler = async (req, res) => {
    const filter = req.body.filter;
    try {
        CoolingSchema.find()
            .then(async response => {
                let cooler = [];
                for (let item of response) {
                    if (item.name.split(' ')[0] === filter) {
                        cooler.push(item)
                    }
                    if (filter === 'All') {
                        cooler = response
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