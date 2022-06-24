const ProxyAgent = require('proxy-agent')
const fs = require('node:fs')

module.exports = {
    async getAllProxies() {
        // Reads all proxies, separating them by new line
        let proxyList = await fs.readFileSync('./resources/proxies.txt', 'utf8');
        return proxyList;
    },
    async genRandomProxy() {
        // Grabs all proxies
        let proxyList = await this.getAllProxies();
        // Checks to see if we have anything in there
        if (proxyList.length == 0) {
            return null;
        }
        proxyList = proxyList.split("\n");
        // Picks a random proxy
        let proxySelected = proxyList[Math.floor(Math.random() * (proxyList.length - 1))].trim().split(":");
        // Put into URI form to transform into a proxy agent
        let createURI = `http://${proxySelected[2]}:${proxySelected[3]}@${proxySelected[0]}:${proxySelected[1]}`;
        return new ProxyAgent(createURI);
    },
}