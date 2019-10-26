const mongoose = require("mongoose");
//mongodb+srv://Diaa:<password>@online-shop-ymjeu.mongodb.net/test?retryWrites=true&w=majority


const url_DB = "mongodb+srv://Diaa:zxczxczxc330@online-shop-ymjeu.mongodb.net/online-shop?retryWrites=true&w=majority";

const cartSchema = mongoose.Schema({
    product : String,
    price : Number,
    amount : Number,
    category : String,
    product_id: String,
    id : String,
    timeStamp : Number,

})
const Cart = mongoose.model("cart", cartSchema);


exports.getCarts = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB,{useNewUrlParser : true}).then(() => {
            return Cart.find({id : id},{}, {
                sort : {
                    timeStamp : -1
                }
            });
        }).then((cart) => {
            // console.log(cart)
            mongoose.disconnect();
            resolve(cart);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        })
    })
}
exports.saveModelCarts = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB,{useNewUrlParser : true}).then(() => {
            return Cart.findOne({product_id : data.product_id});
            
        }).then(result => {
            console.log(result)
            if(!result) {
                let cart = new Cart(data);
                return cart.save();
            }else{ 
                let updatedDoc =  Object.assign(result, {
                    amount : Number(data.amount) + result.amount,
                    timeStamp : Date.now(),
                });
                let cart = new Cart(updatedDoc);
                return cart.save();

            }
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.updateData = (data, id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser: true}).then(() =>{
            // return Cart.findByIdAndUpdate(id, data);
            return Cart.updateOne({ _id : id}, data);
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        })
    })
}
exports.deleteDoc = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            return Cart.findByIdAndDelete(id)
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    }) 
}

// exports.getOrderById = (id) => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(url_DB, {useNewUrlParser: true}).then(() => {
//             return Cart.find({_id : id})
//         }).then((cart) => {
//             mongoose.disconnect();
//             resolve(cart);
//         }).catch(err => {
//             mongoose.disconnect();
//             reject(err);
//         })
//     })
// }

exports.deleteAllMyCart = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            
            return Cart.deleteMany({id : id});
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).then(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.getAllCarts = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            
            return Cart.find({id : id});
        }).then((carts) => {
            // console.log(carts)
            mongoose.disconnect();
            resolve(carts);
        }).then(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}


exports.getCartToOrder = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB,{useNewUrlParser : true}).then(() => {
            return Cart.findOne({_id : id});
        }).then((cart) => {
            // console.log(cart)
            mongoose.disconnect();
            resolve(cart);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        })
    })
}