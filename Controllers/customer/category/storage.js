const StorageSchema = require('../../../Models/Storage/Storage');
const StorageFilter = require('../../../Models/Storage/StorageFilter');
const StorageType = require('../../../Models/Storage/StorageType');
const StorageFactor = require('../../../Models/Storage/StorageFactor');

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

exports.getStorageManufacturer = async (req, res) => {
    try {
        StorageFilter.find()
            .then(async manufacturer => {
                await res.status(200).json({
                    manufacturer
                })
            })
    }  catch (e) {
        console.log('cpu filter error', e.message)
    }
};

exports.getStorageType = async (req, res) => {
    try {
        StorageType.find()
            .then(async type => {
                await res.status(200).json({
                    type
                })
            })
    }  catch (e) {
        console.log('cpu filter error', e.message)
    }
};

exports.getStorageFactor = async (req, res) => {
    try {
        StorageFactor.find()
            .then(async factor => {
                await res.status(200).json({
                    factor
                })
            })
    }  catch (e) {
        console.log('cpu filter error', e.message)
    }
};

exports.filterStorage = async (req, res) => {
    const manufacturer = req.body.manufacturer;
    const fPrice = req.body.fPrice;
    const tPrice = req.body.tPrice;
    const fCapacity = req.body.fCapacity;
    const tCapacity = req.body.tCapacity;
    const type = req.body.type;
    const fCache = req.body.fCache;
    const tCache = req.body.tCache;
    const factor = req.body.factor;
    console.log(manufacturer, fPrice, tPrice, fCapacity, tCapacity, type, fCache, tCache, factor);
    try {
        StorageSchema.find()
            .then(async response => {
                let storage = [];
                for (let item of response) {
                   let data_cache = item.cache === undefined ? 0 : item.cache.split(' ')[0];
                   if (parseFloat(fPrice) <= parseFloat(item.price.split('$')[1]) &&
                       parseFloat(tPrice) >= parseFloat(item.price.split('$')[1]) &&
                       parseFloat(fCapacity) <= parseFloat(item.capacity.split(' ')[0]) &&
                       parseFloat(tCapacity) >= parseFloat(item.capacity.split(' ')[0]) &&
                       parseFloat(fCache) <= parseFloat(data_cache) &&
                       parseFloat(tCache) >= parseFloat(data_cache)
                   ) {
                       if (manufacturer === 'All') {
                           if (type === 'All' && factor === 'All') {
                               storage.push(item)
                           }
                           else if (type === 'All' && factor === item.factor) {
                              storage.push(item)
                           }
                           else if (type === item.type && factor === 'All') {
                               storage.push(item)
                           }
                           else if (type === item.type && factor === item.factor) {
                               storage.push(item)
                           }
                       } else if (item.name.includes(manufacturer)) {
                           if (type === 'All' && factor === 'All') {
                               storage.push(item)
                           }
                           else if (type === 'All' && factor === item.factor) {
                               storage.push(item)
                           }
                           else if (type === item.type && factor === 'All') {
                               storage.push(item)
                           }
                           else if (type === item.type && factor === item.factor) {
                               storage.push(item)
                           }
                       }
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