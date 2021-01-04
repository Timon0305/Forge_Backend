const CasesSchema = require('../../../Models/Case/Cases');
const CaseFilterSchema = require('../../../Models/Case/CaseFilter');

exports.getAllCases = async (req, res) => {
    try {
        CasesSchema.find()
            .then(async cases => {
                await cases.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                res.status(200).json({
                    cases
                })
            })
    } catch (e) {
        console.log('Cases exception---', e.message);
    }
} ;

exports.getCaseFilter = async (req, res) => {
    try {
        CaseFilterSchema.find()
            .then(async caseFilter => {
                await res.status(200).json({
                    caseFilter
                })
            })
    }  catch (e) {
        console.log('cpu filter error', e.message)
    }
};

exports.filterCases = async (req, res) => {
    const filter = req.body.filter;
    try {
        CasesSchema.find()
            .then(async response => {
                let cases = [];
                for (let item of response) {
                    if (item.name.split(' ')[0] === filter) {
                        cases.push(item)
                    }
                    if (filter === 'All') {
                        cases = response
                    }
                }
                await cases.sort((a, b) => {
                    return parseFloat(a.price.split('$')['1']) -  parseFloat(b.price.split('$')['1'])
                });
                await res.status(200).json({
                    cases
                })
            })
    } catch (e) {
        console.log('Case filter exception', e.message);
    }
};