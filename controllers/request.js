const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports =  {
        async getSource(link) {
            // Checks if link is valid
            if (link.includes('shopify') || !link.includes('products') || link.includes('.js') || link.includes('variant')) {
                return false;
            }

            let jsLink = link + ".js";
            const response = await fetch(jsLink);
            const data = await response.json();
            return data;
        }
}