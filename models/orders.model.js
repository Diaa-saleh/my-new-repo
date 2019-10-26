const mongoose = require("mongoose");

const url_DB = "mongodb+srv://Diaa:zxczxczxc330@online-shop-ymjeu.mongodb.net/online-shop?retryWrites=true&w=majority";
const orderSchema = mongoose.Schema({
    
    product : String,
    price : Number,
    amount : Number,
    address : String,
    product_Id : String,
    status : String,
    timeStamp : Number,
    id : String,
    
    
          
});

const Order = mongoose.model("order", orderSchema);




exports.getOrdersModel = () => {
    return new Promise((resolve, reject) => {
        // return reject("error handeling in database")
        mongoose.connect(url_DB, {useNewUrlParser: true}).then(() => {
            
            return Order.find();
        }).then((orders) => {
            mongoose.disconnect();
            resolve(orders);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.saveOrderModel = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            let order = new Order(data);
            return order.save();
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.cancelOrderById = (id) =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser:true}).then(() =>{
            return Order.deleteOne({product_Id : id});
        }).then(() => {
            mongoose.disconnect();
            resolve();
       
        }).catch(err => {
            mongoose.disconnect();
            reject();
        })
    })
}

exports.cancelAllOrders = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB,{useNewUrlParser : true}).then(() => {
            return Order.deleteMany({id : id});
    
        }).then(() => {
            mongoose.disconnect();
            resolve();

        }).then(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

/*
exports.saveAllOrders = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB,{useNewUrlParser : true}).then(() => {
             Order.create(data, {"oneOperation": true}).then((docs)=>{
                mongoose.disconnect();
                resolve();
                console.log(docs);
            });
    
        }).then(() => {
            mongoose.disconnect();
            resolve();

        }).then(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}
*/

exports.editStatus = (id, status) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            return Order.updateOne({product_Id : id}, status);
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.getOrderByStatus = (status) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            return Order.find({status : status});
        }).then((orders) => {
            mongoose.disconnect();
            resolve(orders);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.getOrdersOfThisEmail = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            return Order.find({id : id});
        }).then((orders) => {
            mongoose.disconnect();
            resolve(orders);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}