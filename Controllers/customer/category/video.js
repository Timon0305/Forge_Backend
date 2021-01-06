const VideoSchema = require('../../../Models/Video-Card/Video');
const VideoCardFilter = require('../../../Models/Video-Card/VideoFilter');
const VideoCardChipSet = require('../../../Models/Video-Card/VideoChipSet');
const VideoCardColor = require('../../../Models/Video-Card/VideoColor');

exports.getAllVideo = async (req, res) => {
    try {
        VideoSchema.find()
            .then(video => {
                res.status(200).json({
                    video
                })
            })
    } catch (e) {
        console.log('Video exception---', e.message);
    }
} ;

exports.getVideoCardManufacturer = async (req, res) => {
    try {
        VideoCardFilter.find()
            .then(async manufacturer => {
                await res.status(200).json({
                    manufacturer
                })
            })
    }  catch (e) {
        console.log('Video Card Manufacturer error', e.message)
    }
};

exports.getVideoCardChipSet = async (req, res) => {
    try {
        VideoCardChipSet.find()
            .then(async chipSet => {
                await res.status(200).json({
                    chipSet
                })
            })
    }  catch (e) {
        console.log('Video Card ChipSet error', e.message)
    }
};

exports.getVideoCardColor = async (req, res) => {
    try {
        VideoCardColor.find()
            .then(async color => {
                await res.status(200).json({
                    color
                })
            })
    }  catch (e) {
        console.log('Video Card Color error', e.message)
    }
};

exports.filterVideoCard = async (req, res) => {
    const filter = req.body.filter;
    try {
        VideoSchema.find()
            .then(async response => {
                let video = [];
                for (let item of response) {
                    if (item.name.split(' ')[0] === filter) {
                        video.push(item)
                    }
                    if (filter === 'All') {
                        video = response
                    }
                }
                await video.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    video
                })
            })
    } catch (e) {
        console.log('Video Card filter exception', e.message);
    }
};