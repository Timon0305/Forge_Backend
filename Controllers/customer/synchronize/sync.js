const puppeteer = require('puppeteer');
const CpuSchema = require('../../../Models/CPU/Cpu');
const MemorySchema = require('../../../Models/Memory/Memory');
const MotherBoardSchema = require('../../../Models/Motherboard/Motherboard');
const VideoShema = require('../../../Models/Video-Card/Video');
const PowerSchema = require('../../../Models/Power-Supply/Power');
const CoolingSchema = require('../../../Models/Cpu-Cooler/Cooling');
const CaseSchema = require('../../../Models/Case/Cases');
const StorageSchema = require('../../../Models/Storage/Storage');
const SoftwareSchema = require('../../../Models/Software/Software');
const cpuURL = "https://pcpartpicker.com/products/cpu/#page=";
const memoryURL = "https://pcpartpicker.com/products/memory/#page=";
const motherboardURL = "https://pcpartpicker.com/products/motherboard/#page=";
const videoURL = "https://pcpartpicker.com/products/video-card/#page=";
const powerURL = "https://pcpartpicker.com/products/power-supply/#page=";
const coolingURL = 'https://pcpartpicker.com/products/cpu-cooler/#page=';
const caseURL = 'https://pcpartpicker.com/products/case/#page=';
const storageURL = 'https://pcpartpicker.com/products/internal-hard-drive/#page=';
const softwareURL = 'https://pcpartpicker.com/products/os/#page=';

exports.cpuSync = async (req, res) => {
    const sync = req.body.isCPUSync;
    if  (sync === true) {
        try {
            let data = [];
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            for(let i= 1 ; i < 14; i ++){
                await page.goto(cpuURL + i,{waitUntil: 'networkidle0'});
                await delay(4000);
                await page.waitForFunction(
                    () => document.querySelectorAll('table tbody#category_content tr td.td__name div.td__nameWrapper p').length > 0, {})
                    .then(async ()=>{
                        data = await page.evaluate( (data) => {

                            let items = document.querySelectorAll('tbody#category_content tr');

                            for (let j = 1; j <= items.length; j++) {
                                let name = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__nameWrapper p').innerText;
                                let image = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__image img').getAttribute('src');
                                let coreCount = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--1').innerText.split('\n')[1];
                                let coreClock = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--2').innerText.split('\n')[1];
                                let boostClock = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--3').innerText.split('\n')[1];
                                let tdp = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--4').innerText.split('\n')[1];
                                let graphics = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--5').innerText.split('\n')[1];
                                let smt = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--6').innerText.split('\n')[1];
                                let price = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__price').innerHTML.split('<')[0];

                                data.push(
                                    {
                                        name: name,
                                        image: image,
                                        coreCount: coreCount,
                                        coreClock: coreClock,
                                        boostClock: boostClock,
                                        tdp: tdp,
                                        graphics: graphics,
                                        smt: smt,
                                        price: price
                                    });
                            }
                            return data
                        }, data);
                    });
            }
            for (let item of data) {
                const newCPU = new CpuSchema(item);
                newCPU.save();

            }
            await browser.process().kill('SIGINT')
        } catch (e) {
            console.log(e)
        }

    } else {
        return res.json({
            state: false
        })
    }

};

exports.memorySync = async (req, res) => {
    const sync = req.body.isMemorySync;
    if  (sync === true) {
        try {
            let data = [];
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            for(let i= 1 ; i < 77; i ++){
                await page.goto(memoryURL + i,{waitUntil: 'networkidle0'});
                await delay(4000);
                await page.waitForFunction(
                    () => document.querySelectorAll('table tbody#category_content tr td.td__name div.td__nameWrapper p').length > 0, {})
                    .then(async ()=>{
                        data = await page.evaluate( (data) => {

                            let items = document.querySelectorAll('tbody#category_content tr');

                            for (let j = 1; j <= items.length; j++) {
                                let name = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__nameWrapper p').innerText;
                                let image = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__image img').getAttribute('src');
                                let speed = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--1').innerText.split('\n')[1];
                                let modules = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--2').innerText.split('\n')[1];
                                let gbprice = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--3').innerText.split('\n')[1];
                                let color = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--4').innerText.split('\n')[1];
                                let flatency = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--5').innerText.split('\n')[1];
                                let clatency = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--6').innerText.split('\n')[1];
                                let price = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__price').innerHTML.split('<')[0];

                                data.push(
                                    {
                                        name: name,
                                        image: image,
                                        speed: speed,
                                        modules: modules,
                                        gbprice: gbprice,
                                        color: color,
                                        flatency: flatency,
                                        clatency: clatency,
                                        price: price
                                    });
                            }
                            return data
                        }, data);
                    });
            }
            for (let item of data) {
                const newMemory = new MemorySchema(item);
                newMemory.save();
            }
            await browser.process().kill('SIGINT')
        } catch (e) {
            console.log(e)
        }

    } else {
        return res.json({
            state: false
        })
    }
};

exports.motherBoardSync = async (req, res) => {
    const sync = req.body.isMotherBoardSync;
    if  (sync === true) {
        try {
            let data = [];
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            for(let i= 1 ; i < 35; i ++){
                await page.goto(motherboardURL + i,{waitUntil: 'networkidle0'});
                await delay(4000);
                await page.waitForFunction(
                    () => document.querySelectorAll('table tbody#category_content tr td.td__name div.td__nameWrapper p').length > 0, {})
                    .then(async ()=>{
                        data = await page.evaluate( (data) => {

                            let items = document.querySelectorAll('tbody#category_content tr');

                            for (let j = 1; j <= items.length; j++) {
                                let name = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__nameWrapper p').innerText;
                                let image = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__image img').getAttribute('src');
                                let socket = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--1').innerText.split('\n')[1];
                                let factor = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--2').innerText.split('\n')[1];
                                let max = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--3').innerText.split('\n')[1];
                                let slots = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--4').innerText.split('\n')[1];
                                let color = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--5').innerText.split('\n')[1];
                                let price = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__price').innerHTML.split('<')[0];

                                data.push(
                                    {
                                        name: name,
                                        image: image,
                                        socket: socket,
                                        factor: factor,
                                        max: max,
                                        slots: slots,
                                        color: color,
                                        price: price
                                    });
                            }
                            return data
                        }, data);
                    });
            }
            for (let item of data) {
                const newMotherBoard = new MotherBoardSchema(item);
                newMotherBoard.save();
            }
            console.log('finished', data.length);
            await browser.process().kill('SIGINT')
        } catch (e) {
            console.log(e)
        }

    } else {
        return res.json({
            state: false
        })
    }
};

exports.videoSync = async (req, res) => {
    const sync = req.body.isVideoSync;
    if  (sync === true) {
        try {
            let data = [];
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            for(let i= 1 ; i < 47; i ++){
                await page.goto(videoURL + i,{waitUntil: 'networkidle0'});
                await delay(4000);
                await page.waitForFunction(
                    () => document.querySelectorAll('table tbody#category_content tr td.td__name div.td__nameWrapper p').length > 0, {})
                    .then(async ()=>{
                        data = await page.evaluate( (data) => {

                            let items = document.querySelectorAll('tbody#category_content tr');

                            for (let j = 1; j <= items.length; j++) {
                                let name = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__nameWrapper p').innerText;
                                let image = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__image img').getAttribute('src');
                                let chipset = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--1').innerText.split('\n')[1];
                                let memory = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--2').innerText.split('\n')[1];
                                let coreClock = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--3').innerText.split('\n')[1];
                                let boostClock = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--4').innerText.split('\n')[1];
                                let color = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--5').innerText.split('\n')[1];
                                let length = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--6').innerText.split('\n')[1];
                                let price = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__price').innerHTML.split('<')[0];

                                data.push(
                                    {
                                        name: name,
                                        image: image,
                                        chipset: chipset,
                                        memory: memory,
                                        coreClock: coreClock,
                                        boostClock: boostClock,
                                        color: color,
                                        length: length,
                                        price: price
                                    });
                            }
                            return data
                        }, data);
                    });
            }
            for (let item of data) {
                const newVideo = new VideoShema(item);
                newVideo.save();
            }
            console.log('finished', data.length);
            await browser.process().kill('SIGINT')
        } catch (e) {
            console.log(e)
        }

    } else {
        return res.json({
            state: false
        })
    }
};

exports.powerSync = async (req, res) => {
    const sync = req.body.isPowerSync;
    if  (sync === true) {
        try {
            let data = [];
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            for(let i= 1 ; i < 23; i ++){
                await page.goto(powerURL + i,{waitUntil: 'networkidle0'});
                await delay(4000);
                await page.waitForFunction(
                    () => document.querySelectorAll('table tbody#category_content tr td.td__name div.td__nameWrapper p').length > 0, {})
                    .then(async ()=>{
                        data = await page.evaluate( (data) => {

                            let items = document.querySelectorAll('tbody#category_content tr');

                            for (let j = 1; j <= items.length; j++) {
                                let name = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__nameWrapper p').innerText;
                                let image = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__image img').getAttribute('src');
                                let factor = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--1').innerText.split('\n')[1];
                                let efficiency = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--2').innerText.split('\n')[1];
                                let wattage = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--3').innerText.split('\n')[1];
                                let modular = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--4').innerText.split('\n')[1];
                                let color = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--5').innerText.split('\n')[1];
                                let price = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__price').innerHTML.split('<')[0];

                                data.push(
                                    {
                                        name: name,
                                        image: image,
                                        factor: factor,
                                        efficiency: efficiency,
                                        wattage: wattage,
                                        modular: modular,
                                        color: color,
                                        price: price
                                    });
                            }
                            return data
                        }, data);
                    });
            }
            for (let item of data) {
                const newPower = new PowerSchema(item);
                newPower.save();
            }
            console.log('finished', data.length);

            await browser.process().kill('SIGINT')
        } catch (e) {
            console.log(e)
        }

    } else {
        return res.json({
            state: false
        })
    }
};

exports.coolingSync = async (req, res) => {
    const sync = req.body.isCoolingSync;
    if  (sync === true) {
        try {
            let data = [];
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            for(let i= 1 ; i < 14; i ++){
                await page.goto(coolingURL + i,{waitUntil: 'networkidle0'});
                await delay(4000);
                await page.waitForFunction(
                    () => document.querySelectorAll('table tbody#category_content tr td.td__name div.td__nameWrapper p').length > 0, {})
                    .then(async ()=>{
                        data = await page.evaluate( (data) => {

                            let items = document.querySelectorAll('tbody#category_content tr');

                            for (let j = 1; j <= items.length; j++) {
                                let name = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__nameWrapper p').innerText;
                                let image = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__image img').getAttribute('src');
                                let rpm = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--1').innerText.split('\n')[1];
                                let noise = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--2').innerText.split('\n')[1];
                                let color = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--3').innerText.split('\n')[1];
                                let radiator = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--4').innerText.split('\n')[1];
                                let price = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__price').innerHTML.split('<')[0];

                                data.push(
                                    {
                                        name: name,
                                        image: image,
                                        rpm: rpm,
                                        noise: noise,
                                        color: color,
                                        radiator: radiator,
                                        price: price
                                    });
                            }
                            return data
                        }, data);
                    });
            }
            for (let item of data) {
                const newCooling = new CoolingSchema(item);
                newCooling.save();
            }
            console.log('finished', data.length);
            await browser.process().kill('SIGINT')
        } catch (e) {
            console.log(e)
        }

    } else {
        return res.json({
            state: false
        })
    }
};

exports.caseSync = async (req, res) => {
    const sync = req.body.isCaseSync;
    if  (sync === true) {
        try {
            let data = [];
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            for(let i= 1 ; i < 44; i ++){
                await page.goto(caseURL + i,{waitUntil: 'networkidle0'});
                await delay(4000);
                await page.waitForFunction(
                    () => document.querySelectorAll('table tbody#category_content tr td.td__name div.td__nameWrapper p').length > 0, {})
                    .then(async ()=>{
                        data = await page.evaluate( (data) => {

                            let items = document.querySelectorAll('tbody#category_content tr');

                            for (let j = 1; j <= items.length; j++) {
                                let name = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__nameWrapper p').innerText;
                                let image = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__image img').getAttribute('src');
                                let type = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--1').innerText.split('\n')[1];
                                let color = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--2').innerText.split('\n')[1];
                                let power = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--3').innerText.split('\n')[1];
                                let side = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--4').innerText.split('\n')[1];
                                let external = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--5').innerText.split('\n')[1];
                                let internal = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--6').innerText.split('\n')[1];
                                let price = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__price').innerHTML.split('<')[0];

                                data.push(
                                    {
                                        name: name,
                                        image: image,
                                        type: type,
                                        color: color,
                                        power: power,
                                        side: side,
                                        external: external,
                                        internal: internal,
                                        price: price
                                    });
                            }
                            return data
                        }, data);
                    });
            }
            for (let item of data) {
                const newCases = new CaseSchema(item);
                newCases.save();
            }
            console.log('finished', data.length);
            await browser.process().kill('SIGINT')
        } catch (e) {
            console.log(e)
        }

    } else {
        return res.json({
            state: false
        })
    }
};

exports.storageSync = async (req, res) => {
    const sync = req.body.isStorageSync;
    if  (sync === true) {
        try {
            let data = [];
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            for(let i= 1 ; i < 42; i ++){
                await page.goto(storageURL + i,{waitUntil: 'networkidle0'});
                await delay(4000);
                await page.waitForFunction(
                    () => document.querySelectorAll('table tbody#category_content tr td.td__name div.td__nameWrapper p').length > 0, {})
                    .then(async ()=>{
                        data = await page.evaluate( (data) => {

                            let items = document.querySelectorAll('tbody#category_content tr');

                            for (let j = 1; j <= items.length; j++) {
                                let name = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__nameWrapper p').innerText;
                                let image = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__image img').getAttribute('src');
                                let capacity = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--1').innerText.split('\n')[1];
                                let gbprice = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--2').innerText.split('\n')[1];
                                let type = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--3').innerText.split('\n')[1];
                                let cache = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--4').innerText.split('\n')[1];
                                let factor = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--5').innerText.split('\n')[1];
                                let interfaces = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--6').innerText.split('\n')[1];
                                let price = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__price').innerHTML.split('<')[0];

                                data.push(
                                    {
                                        name: name,
                                        image: image,
                                        capacity: capacity,
                                        gbprice: gbprice,
                                        type: type,
                                        cache: cache,
                                        factor: factor,
                                        interface: interfaces,
                                        price: price
                                    });
                            }
                            return data
                        }, data);
                    });
            }
            for (let item of data) {
                const newStorage = new StorageSchema(item);
                newStorage.save();
            }
            console.log('finished', data.length);
            await browser.process().kill('SIGINT')
        } catch (e) {
            console.log(e)
        }

    } else {
        return res.json({
            state: false
        })
    }
};

exports.softwareSync = async (req, res) => {
    const sync = req.body.isSoftwareSync;
    if  (sync === true) {
        try {
            let data = [];
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            for(let i= 1 ; i < 2; i ++){
                await page.goto(softwareURL + i,{waitUntil: 'networkidle0'});
                await delay(4000);
                await page.waitForFunction(
                    () => document.querySelectorAll('table tbody#category_content tr td.td__name div.td__nameWrapper p').length > 0, {})
                    .then(async ()=>{
                        data = await page.evaluate( (data) => {

                            let items = document.querySelectorAll('tbody#category_content tr');

                            for (let j = 1; j <= items.length; j++) {
                                let name = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__nameWrapper p').innerText;
                                let image = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__name div.td__image img').getAttribute('src');
                                let type = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--1').innerText.split('\n')[1];
                                let mode = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--2').innerText.split('\n')[1];
                                let maximum = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__spec--3').innerText.split('\n')[1];
                                let price = document.querySelector('tbody#category_content tr:nth-child('+ j +') td.td__price').innerHTML.split('<')[0];

                                data.push(
                                    {
                                        name: name,
                                        image: image,
                                        type: type,
                                        mode: mode,
                                        maximum: maximum,
                                        price: price
                                    });
                            }
                            return data
                        }, data);
                    });
            }
            for (let item of data) {
                const newSoftware = new SoftwareSchema(item);
                newSoftware.save();
            }
            console.log('finished', data.length);
            await browser.process().kill('SIGINT')
        } catch (e) {
            console.log(e)
        }

    } else {
        return res.json({
            state: false
        })
    }

};


exports.others = async (req, res) => {
    const url = 'https://pcpartpicker.com/products/internal-hard-drive/';
    const CpuSeries = require('../../../Models/Storage/StorageFactor');
    let data = [];
    const browser = await puppeteer.launch({header: false});
    const page = await browser.newPage();

    for (let i = 1; i < 2; i++) {
        await page.goto(url, {waitUntil: 'networkidle0'});
        await delay(4000);
        await page.waitForFunction(
            () => document.querySelectorAll('#f_set li label').length > 0, {})
            .then(async () => {
                data = await page.evaluate((data) => {
                    let item = document.querySelectorAll('#f_set li');

                    for (let j = 1; j <= item.length; j++) {
                        let name = document.querySelector('#f_set li:nth-child(' +j +') label').innerText;
                        let status = 'false';
                        data.push(
                            {
                                name,
                                status
                            })
                    }
                    return data;
                }, data);
            })
    }
    for (let item of data) {
        const schema = new CpuSeries(item);
        schema.save();
    }
    console.log('finished-', data.length);
    await browser.process().kill('SIGINT')
};

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}