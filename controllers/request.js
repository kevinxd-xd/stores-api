const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const proxy = require('../helpers/proxy.js')

module.exports =  {
        async getSource(link) {
            // Checks if link is valid
            if (link.includes('shopify') || !link.includes('products') || link.includes('.js') || link.includes('variant')) {
                return false;
            }
            let jsLink = link + ".js";
            const pa = await proxy.genRandomProxy();
            const response = await fetch(jsLink, {
                "agent": pa,
            });
            const data = await response.json();
            return data;
        }
}