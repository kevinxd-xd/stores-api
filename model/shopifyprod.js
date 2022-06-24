module.exports = class Product {
    constructor(url, src) {
        this.URL = url;
        this.source = src;
        this.vars = this.parseVariants(src);
        this.subnames = this.parseSubNames(src);
        this.pic = src.media[0].src;
        this.prodName = src.title;
    }
    parseVariants(source) {
        const variants = []
        for (let key in this.source.variants) {
            variants.push(this.source.variants[key].id);
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
}