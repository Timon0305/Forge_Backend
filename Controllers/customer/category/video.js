const VideoSchema = require('../../../Models/Category/Video');
const VideoCardFilter = require('../../../Models/Filter/VideoFilter');

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

exports.getVideoCardFilter = async (req, res) => {
    try {
        VideoCardFilter.find()
            .then(async videoFilter => {
                await res.status(200).json({
                    videoFilter
                })
            })
    }  catch (e) {
        console.log('Video Card filter error', e.message)
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