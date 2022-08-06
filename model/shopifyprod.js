module.exports = class ShopifyProduct {
    constructor(url, variants, subnames, pics, productName) {
        this.URL = url;
        this.vars = variants;
        this.subnames = subnames;
        this.pic = pics;
        this.prodName = productName;
    }
    parseVariants(source) {
        const variants = []
        for (let key in source.variants) {
            variants.push(source.variants[key].id);
        }
        return variants;
    }
    parseSubNames(source) {
        const subnames = []
        for (let key in source.variants) {
            subnames.push(source.variants[key].title);
        }
        return subnames;
    }
    setFields(url, src) {
        this.URL = url;
        this.vars = this.parseVariants(src);
        this.subnames = this.parseSubNames(src);
        this.pic = src.media[0].src;
        this.prodName = src.title;
    }
}