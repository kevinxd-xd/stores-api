const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const proxy = require('../helpers/proxy.js')
const ShopifyProduct = require('../model/shopifyprod.js');

module.exports =  {
        async getSource(link) {
            // Checks if link is valid
            if (link.includes('shopify') || !link.includes('products') || link.includes('.js') || link.includes('variant')) {
                return null;
            }
            let jsLink = link + ".js";
            const pa = await proxy.genRandomProxy();
            try {
                const response = await fetch(jsLink, {
                    "agent": pa,
                });
                const data = await response.json();
                const prdData = new ShopifyProduct(link, data);
                return prdData;
            }
            catch (error) {
                return error;
            }
        }
}