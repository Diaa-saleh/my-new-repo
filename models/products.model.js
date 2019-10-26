const mongoose = require('mongoose');

//mongodb+srv://Diaa:<password>@online-shop-ymjeu.mongodb.net/test?retryWrites=true&w=majority

const url_DB = "mongodb+srv://Diaa:zxczxczxc330@online-shop-ymjeu.mongodb.net/online-shop?retryWrites=true&w=majority";
let onlineShopSchema = mongoose.Schema({
    name :String,
    price: Number,
    category: String,
    description: String,
    image: String
});
let Product = mongoose.model('product', onlineShopSchema );

exports.getAllProducts = () =>{

    return new Promise((resolve, reject) => {
         mongoose.connect(url_DB, {useNewUrlParser : true}).then(() =>{
             return Product.find({})
         }).then(products => {
             mongoose.disconnect();
             resolve(products);
 
         }).catch(err => reject(err))
    })
     
}
exports.getAllProductsByCatogeries = (catogery) =>{

    return new Promise((resolve, reject) => {
         mongoose.connect(url_DB, {useNewUrlParser : true}).then(() =>{
             return Product.find({category : catogery})
         }).then(products => {
             mongoose.disconnect();
             resolve(products);
 
         }).catch(err => reject(err))
    })
     
}
// this function return to me promise i controll it because i can't send the main promise because 
// there is asynchronus operation and i want send the promise after this operation is exit 
// example mongoose.disconnected
exports.getProductById = (id) =>{

    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB).then(() =>{
        return Product.findById(id)
        }).then(products => {
        mongoose.disconnect();
        resolve(products);

        }).catch(err => reject(err))
    })
     
}
exports.getFirstPro = () =>{

    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB).then(() =>{
        return Product.findOne()
        }).then(products => {
        mongoose.disconnect();
        resolve(products);

        }).catch(err => reject(err))
    })
     
}


exports.addProduct = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            let products = new Product(data);
            return products.save();
        }).then(() => {
            mongoose.disconnect();
            resolve();

        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}