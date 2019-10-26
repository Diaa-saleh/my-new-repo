const ordersModel = require("../models/orders.model");
const modelCart = require("../models/cart.model");

const validationResult = require("express-validator").validationResult;

exports.getOrders = (req, res, next) => {
    ordersModel.getOrdersModel().then((orders) => {
        res.render("orders", {
            orders : orders,
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            title : "Orders"
        })
    }).catch(err => {
        next(err)
    })
}
exports.saveOrder = (req, res, next) => {
    console.log(req.body.orderId)
    console.log(req.body.check)
   /**
    *  if(req.body.check == "false"){ 
        modelCart.getAllCarts(req.session.userId).then(data => {
            let orders = [];
            for(let ele of data) {
                let obj = {
                    product : ele.product,
                    price : ele.price,
                    amount : ele.amount,
                    address : req.body.address,
                    product_Id : ele.product_id,
                    timeStamp : Date.now(),
                    id : req.session.userId,     
                }
                orders.push(obj);
            }
            console.log(orders)
            ordersModel.saveAllOrders(orders).then(() => {
                res.redirect("/orders");
                next()
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
       
  
    }else{
    */
        modelCart.getCartToOrder(req.body.orderId).then(data => {
            ordersModel.saveOrderModel({
                product : data.product,
                price : data.price,
                amount : data.amount,
                address : req.body.address,
                product_Id : req.body.orderId,
                status : "pending",
                timeStamp : Date.now(),
                id : req.session.userId,     
            }).then(() => {
                res.redirect("/orders");
                next()
            })
            
        })
        
       
        
    // }
}
/*{
            product : req.body.productName,
            price : req.body.price,
            amount : req.body.amount,
            address : req.body.address,
            product_Id : req.body.orderId,
            timeStamp : Date.now(),
            id : req.session.userId,     
        } */
exports.deleteCart = (req, res, next) => {
    modelCart.deleteDoc(req.body.orderId);
    next();
}

exports.cancelOrder = (req, res, next) => {
    console.log(req.body.product_Id)
    ordersModel.cancelOrderById(req.body.product_Id)
    .then(() => {
        res.redirect("/orders");
    })
}

exports.cancelAll = (req, res, next) => {
    ordersModel.cancelAllOrders(req.session.userId).then(() => {
        res.redirect("/orders");
    })
}