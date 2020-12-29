const MemorySchema = require('../../../Models/Category/Memory');
const MemoryFilter = require('../../../Models/Filter/MemoryFilter');

exports.getAllMemory = async (req, res) => {
    try {
        MemorySchema.find()
            .then(memory => {
                res.status(200).json({
                    memory
                })
            })
    } catch (e) {
        console.log('memory exception---', e.message);
    }
} ;

exports.getMemoryFilter = async (req, res) => {
    try {
        MemoryFilter.find()
            .then(async memoryFilter => {
                await res.status(200).json({
                    memoryFilter
                })
            })
    }  catch (e) {
        console.log('memory filter error', e.message)
    }
};

exports.filterMemory = async (req, res) => {
    const filter = req.body.filter;
    try {
        MemorySchema.find()
            .then(async response => {
                let memory = [];
                for (let item of response) {
                    if (item.name.split(' ')[0] === filter) {
                        memory.push(item)
                    }
                    if (filter === 'All') {
                        memory = response
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