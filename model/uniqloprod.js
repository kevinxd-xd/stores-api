module.exports = class UniqloProduct {
    constructor(PID, prodSRC, stockSRC) {
        this.url = "https://www.uniqlo.com/us/en/products/" + PID;
        this.prodData = prodSRC;
        this.stockData = stockSRC;
        this.pic = this.parseImgs(this.prodData);
    }
    parseImgs(prodSRC) {
        const photos = [];
        for (const key in prodSRC.result.images.main) {
            photos.push(prodSRC.result.images.main[key].image);
        }
        return photos
    }
}