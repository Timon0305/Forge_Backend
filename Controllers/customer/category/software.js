const SoftwareSchema = require('../../../Models/Software/Software');

exports.getAllSoftware = async (req, res) => {
    try {
        SoftwareSchema.find()
            .then(software => {
                res.status(200).json({
                    software
                })
            })
    } catch (e) {
        console.log('Software exception---', e.message);
    }
} ;

exports.filterSoftware = async (req, res) => {
    const filter = req.body.filter;
    try {
        SoftwareSchema.find()
            .then(async response => {
                let software = [];
                for (let item of response) {
                    if (item.name.split(' ')[0] === filter) {
                        software.push(item)
                    }
                    if (filter === 'All') {
                        software = response
                    }
                }
                await software.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    software
                })
            })
    } catch (e) {
        console.log('Video Card filter exception', e.message);
    }
};