const CpuSchema = require('../../../Models/CPU/Cpu');
const asyncHandler = require('../../../middleware/async');

exports.getCPUs = asyncHandler(async (req, res, next) => {
    try {
        let cpu = await CpuSchema.find();
        await res.status(200).json({
            cpu
        })
    } catch (e) {
        console.log('cpu products', e.message);
    }
});