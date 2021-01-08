const MemorySchema = require('../../../Models/Memory/Memory');
const MemoryFilter = require('../../../Models/Memory/MemoryFilter');
const MemoryModule = require('../../../Models/Memory/MemoryModule');
const MemoryColor = require('../../../Models/Memory/MemoryColor');

exports.getAllMemory = async (req, res) => {
    try {
        MemorySchema.find()
            .then(async response => {
                let memory = [];
                for (let item of response) {
                    if (item.speed.includes('DDR4')) {
                        memory.push(item)
                    }
                }
                await memory.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                res.status(200).json({
                    memory
                })
            })
    } catch (e) {
        console.log('memory exception---', e.message);
    }
} ;

exports.getMemoryManufacturer = async (req, res) => {
    try {
        MemoryFilter.find()
            .then(async manufacturer => {
                await res.status(200).json({
                    manufacturer
                })
            })
    }  catch (e) {
        console.log('memory filter error', e.message)
    }
};

exports.getMemoryModule = async (req, res) => {
    try {
        MemoryModule.find()
            .then(async module => {
                await res.status(200).json({
                    module
                })
            })
    }  catch (e) {
        console.log('memory module error', e.message)
    }
};

exports.getMemoryColor = async (req, res) => {
    try {
        MemoryColor.find()
            .then(async color => {
                await res.status(200).json({
                    color
                })
            })
    }  catch (e) {
        console.log('memory color error', e.message)
    }
};

exports.filterMemory = async (req, res) => {
    const manufacturer = req.body.manufacturer;
    const fPrice = req.body.fPrice;
    const tPrice = req.body.tPrice;
    const module = req.body.module;
    const color = req.body.color;
    const fSpeed = req.body.fSpeed;
    const tSpeed = req.body.tSpeed;
    try {
        MemorySchema.find()
            .then(async response => {
                let memory = [];
                for (let item of response) {
                    if (parseFloat(fPrice) <= parseFloat(item.price.split('$')[1]) &&
                        parseFloat(tPrice) >= parseFloat(item.price.split('$')[1]) &&
                        parseFloat(fSpeed) <= parseFloat(item.speed.split('-')[1]) &&
                        parseFloat(tSpeed) >= parseFloat(item.speed.split('-')[1] ) &&
                        item.speed.includes('DDR4')
                    ) {
                        if (manufacturer === 'All') {
                            if (module === 'All' && color === 'All') {
                                memory.push(item)
                            }
                            else if (module === 'All' && color === item.color) {
                                memory.push(item)
                            }
                            else if (module === item.module && color === 'All') {
                                memory.push(item)
                            }
                        } else if (item.name.includes(manufacturer)) {
                            if (module === 'All' && color === 'All') {
                                memory.push(item)
                            }
                            else if (module === 'All' && color === item.color) {
                                memory.push(item)
                            }
                            else if (module === item.module && color === 'All') {
                                memory.push(item)
                            }
                        }
                    }
                }
                await memory.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    memory
                })
            })
    } catch (e) {
        console.log('cpu filter exception', e.message);
    }
};