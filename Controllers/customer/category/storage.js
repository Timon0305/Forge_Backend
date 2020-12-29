const StorageSchema = require('../../../Models/Category/Storage');
const StorageFilter = require('../../../Models/Filter/StorageFilter');

exports.getAllStorage = async (req, res) => {
    try {
        StorageSchema.find()
            .then(storage => {
                res.status(200).json({
                    storage
                })
            })
    } catch (e) {
        console.log('Storage exception---', e.message);
    }
} ;

exports.getStorageFilter = async (req, res) => {
    try {
        StorageFilter.find()
            .then(async storageFilter => {
                await res.status(200).json({
                    storageFilter
                })
            })
    }  catch (e) {
        console.log('cpu filter error', e.message)
    }
};

exports.filterStorage = async (req, res) => {
    const filter = req.body.filter;
    try {
        StorageSchema.find()
            .then(async response => {
                let storage = [];
                for (let item of response) {
                    if (item.name.split(' ')[0] === filter) {
                        storage.push(item)
                    }
                    if (filter === 'All') {
                        storage = response
                    }
                }
                await storage.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    storage
                })
            })
    } catch (e) {
        console.log('Storage filter exception', e.message);
    }
};