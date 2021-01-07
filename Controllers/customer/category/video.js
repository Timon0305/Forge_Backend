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
    const manufacturer = req.body.manufacturer;
    const fPrice = req.body.fPrice;
    const tPrice = req.body.tPrice;
    const chipSet = req.body.chipSet;
    const color = req.body.color;

    try {
        VideoSchema.find()
            .then(async response => {
                let videoCard = [];
                for (let item of response) {
                    if (parseFloat(fPrice) <= parseFloat(item.price.split('$')[1]) &&
                        parseFloat(tPrice) >= parseFloat(item.price.split('$')[1])
                    ) {
                        if (manufacturer === 'All') {
                            if (chipSet === 'All' && color === 'All') {
                                videoCard.push(item)
                            }
                            else if (chipSet === 'All' && color === item.color) {
                                videoCard.push(item)
                            }
                            else if (chipSet === item.chipSet && color === 'All') {
                                videoCard.push(item)
                            } 
                            else if (chipSet === item.chipSet && color === item.color) {
                                videoCard.push(item)
                            }
                        } 
                        else if (item.name.includes(manufacturer)) {
                            if (chipSet === 'All' && color === 'All') {
                                videoCard.push(item)
                            }
                            else if (chipSet === 'All' && color === item.color) {
                                videoCard.push(item)
                            }
                            else if (chipSet === item.chipSet && color === 'All') {
                                videoCard.push(item)
                            }
                            else if (chipSet === item.chipSet && color === item.color) {
                                videoCard.push(item)
                            }
                        }
                    }
                }
                await videoCard.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    videoCard
                })
            })
    } catch (e) {
        console.log('Video Card filter exception', e.message);
    }
};