const CpuSchema = require('../../../Models/CPU/Cpu');
const CPUFilter = require('../../../Models/CPU/CpuFilter');
const CPUGraphics = require('../../../Models/CPU/CpuGraphics');

exports.getAllCpu = async (req, res) => {
   try {
       CpuSchema.find()
           .then(async cpu => {
               await cpu.sort((a, b) => {
                   return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
               });
               await res.status(200).json({
                  cpu
               })

           })
   } catch (e) {
       console.log('cpu exception---', e.message);
   }
} ;

exports.getCPUFilter = async (req, res) => {
    try {
        CPUFilter.find()
            .then(async manufacturer => {
                await res.status(200).json({
                    manufacturer
                })
            })
    }  catch (e) {
        console.log('cpu filter error', e.message)
    }
};

exports.getCPUGraphics = async (req, res) => {
    try {
        CPUGraphics.find()
            .then(async graphics => {
                await res.status(200).json({
                    graphics
                })
            })
    } catch (e) {
        console.log('cpu integrated graphics error', e.message)
    }
};

exports.filterCpu = async (req, res) => {
    const manufacturer = req.body.manufacturer;
    const fCount = req.body.fCount;
    const tCount = req.body.tCount;
    const fClock = req.body.fClock;
    const tClock = req.body.tClock;
    const graphics = req.body.graphics;
    try {
        CpuSchema.find()
            .then(async response => {
                let cpu = [];
                for (let item of response) {
                    if (parseFloat(fCount) <= parseFloat(item.coreCount) &&
                        parseFloat(tCount) >= parseFloat(item.coreCount) &&
                        parseFloat(fClock) <= parseFloat(item.coreClock.split(' ')[0]) &&
                        parseFloat(tClock) >= parseFloat(item.coreClock.split(' ')[0])
                    ) {
                        if (manufacturer === 'All' && graphics === 'All') {
                            cpu.push(item)
                        }
                        else if (manufacturer === item.name.split(' ')[0] && graphics === 'All') {
                            cpu.push(item)
                        }
                        else if (manufacturer === 'All' && graphics === item.graphics) {
                            cpu.push(item)
                        }
                        else if (manufacturer === item.name.split(' ')[0] && graphics === item.graphics) {
                            cpu.push(item)
                        }
                    }
                }
                await cpu.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    cpu
                })
            })
    } catch (e) {
        console.log('cpu filter exception', e.message);
    }
};