const CpuSchema = require('../../../Models/Category/Cpu');
const CPUFilter = require('../../../Models/Filter/CpuFilter');

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
            .then(async cpuFilter => {
                await res.status(200).json({
                    cpuFilter
                })
            })
    }  catch (e) {
        console.log('cpu filter error', e.message)
    }
};

exports.filterCpu = async (req, res) => {
    const filter = req.body.filter;
    try {
        CpuSchema.find()
            .then(async response => {
                let cpu = [];
                for (let item of response) {
                    if (item.name.split(' ')[0] === filter) {
                        cpu.push(item)
                    }
                    if (filter === 'All') {
                        cpu = response
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