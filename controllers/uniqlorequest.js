const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const proxy = require('../helpers/proxy.js')
const UserAgent = require('user-agents')

module.exports =  {
    async getSource(pid) {
        // Checks if link is valid
        const req = await fetch(`https://www.uniqlo.com/us/api/commerce/v5/en/products/${pid}/price-groups/00/stock?httpFailure=true`, {
            "headers": { 
                "user-agent": new UserAgent()
            },
            "agent": await proxy.genRandomProxy()
        });
        const jsondata = await req.json();
        return jsondata;
    }
}