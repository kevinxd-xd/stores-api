module.exports = class UniqloProduct {
    constructor(PID, prodSRC, stockSRC) {
        this.pid = PID;
        this.url = "https://www.uniqlo.com/us/en/products/" + PID;
        this.salestatus = this.parseSaleBool(prodSRC);
        this.sizes = this.parseSizes(prodSRC)
        this.stockLevel = this.parseStockLevel(stockSRC)
        this.pic = this.parseImgs(prodSRC);
    }
    parseImgs(jsondata) {
        const photos = [];
        for (const key in jsondata.result.images.main) {
            photos.push(jsondata.result.images.main[key].image);
        }
        return photos;
    }
    parseSaleBool(jsondata) {
        for (const key in jsondata.result.l2s) {
            if (jsondata.result.l2s[key].sales == true) {
                return true
            }
        }
        return false;
    }
    parseSizes(jsondata) {
        const sizes = [];
        for (const size in jsondata.result.sizes) {
            sizes.push(jsondata.result.sizes[size].name);
        }
        return sizes;
    }
    parseStockLevel(jsondata) {
        const stockLevels = [];
        let totalStock = 0;
        for (const key in jsondata.result) {
            totalStock += jsondata.result[key].quantity;
            stockLevels.push(jsondata.result[key].quantity);
        }
        stockLevels.unshift(totalStock);
        return stockLevels;
    }
}