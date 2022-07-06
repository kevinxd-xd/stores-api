const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const proxy = require('../helpers/proxy.js')
const UserAgent = require('user-agents')
const UniqloProduct = require('../model/uniqloprod.js')

module.exports =  {
    async getStock(pid) {
        // Checks if link is valid
        const req = await fetch(`https://www.uniqlo.com/us/api/commerce/v5/en/products/${pid}/price-groups/00/stock?httpFailure=true`, {
            "headers": { 
                "user-agent": new UserAgent()
            },
            "agent": await proxy.genRandomProxy()
        });

        const jsondata = await req.json();
        return jsondata;
    },
    async getProdInfo(pid) {
        const req = await fetch(`https://www.uniqlo.com/us/api/commerce/v5/en/products/${pid}/price-groups/00?includeModelSize=false&device=RS&httpFailure=true`, {
            "headers": { 
                "user-agent": new UserAgent()
            },
            "agent": await proxy.genRandomProxy()
        });

        const jsondata = await req.json();
        return jsondata;
    },
    async getUniqlo(pid) {
        const productData = await this.getProdInfo(pid);
        const stockData = await this.getStock(pid);

        if (productData.status != "ok" || stockData.status != "ok") {
            return "400 Bad Request";
        }
        else {
            return new UniqloProduct(pid, productData, stockData);
        }
    }
}