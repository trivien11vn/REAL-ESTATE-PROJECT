const { networkInterfaces } = require('os');

const getIpAddress = () => {
    const nets = networkInterfaces();
    const results = {}

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    console.log(Object.keys(results)[0])
    return Object.values(results)[0]
}

const generateKeyRedis = (filter) => {
    const filterStringKey = JSON.stringify(filter).replace(/\W/g, '').split('').sort((a,b) => a.localeCompare(b)).join();
    const ipAddress = getIpAddress()
    return filterStringKey + ipAddress
}

module.exports = {generateKeyRedis}