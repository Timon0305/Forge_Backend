const MotherboardSchema = require('../../../Models/Motherboard/Motherboard');
const MotherboardFilter = require('../../../Models/Motherboard/MotherboardFilter');

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

exports.getMotherboardFilter = async (req, res) => {
    try {
        MotherboardFilter.find()
            .then(async motherboardFilter => {
                await res.status(200).json({
                    motherboardFilter
                })
            })
    }  catch (e) {
        console.log('Motherboard filter error', e.message)
    }
};

exports.filterMotherboard = async (req, res) => {
    const filter = req.body.filter;
    try {
        MotherboardSchema.find()
            .then(async response => {
                let motherboard = [];
                for (let item of response) {
                    if (item.name.split(' ')[0] === filter) {
                        motherboard.push(item)
                    }
                    if (filter === 'All') {
                        motherboard = response
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