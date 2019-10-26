
let modelCart = require("../models/cart.model");
let validationResult = require("express-validator").validationResult;
let orderModel = require("../models/orders.model")
exports.getCart = (req, res, next) => {
    modelCart.getCarts(req.session.userId).then(carts => {
        res.render("cart", {
            amountError : req.flash("amountError")[0],
            items : carts,
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            title : "Cart"
        });
    }).catch(err => {
        res.redirect("/error")
    })
    
}
exports.controllerCart = (req, res, next) => {
    const errors = validationResult(req).array();
    // return console.log(errors)
    if(errors.length !== 0){
        req.flash("amountError", errors);
        res.redirect(req.body.redirectTo)
    }else{
        modelCart
        .saveModelCarts({
            product : req.body.productName,
            price : req.body.price,
            amount : req.body.amount,
            category : req.body.category,
            product_id : req.body.product_id,
            id : req.session.userId,
            timeStamp : Date.now()
            },{amount : req.body.amount,timeStamp : Date.now()})
        .then(() => {
            res.redirect("/cart");
        })
    }
    
}

exports.saveData = (req, res, next) => {
    const errors = validationResult(req).array();
    // return console.log(errors)
    if(errors.length !== 0){
        req.flash("amountError", errors);
        res.redirect("/cart")
    }else{
        modelCart.updateData({
            amount : req.body.amount,
            timeStamp: Date.now(),
        }, req.body.cartId).then(() =>{
            res.redirect("/cart");
        })
    }
}

exports.deleteData = (req, res, next) => {
    modelCart.deleteDoc(req.body.cartId)
    .then(() => {
        res.redirect("/cart");
    })
}

// exports.getorder = (req, res, next) => {
//     console.log(req.body)
//     console.log("hello")
//     modelCart.getOrderById(req.body.cartId).then((cart) => {
//         console.log(cart)
//         res.render("verfiyorder", {
//             cart : cart,
//             isUser : req.session.userId
//         } )
//     })
    
// }

exports.postOrder = (req, res, next) => {
    
        res.render("verfiyorder",{
            product_Id : req.body.cartId,
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            check : req.body.check,
            title : "verfiyorder"
          }
        );
}
exports.postOrders = (req, res, next) => {
    
        res.render("verfiyorder",{
            product_Id : req.body.cartId,
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            check : req.body.check,
            title : "verfiyorder"
          }
        );
}
/*{
            product : req.body.productName,
            price : req.body.price,
            amount : req.body.amount,
            timeStamp : req.body.timeStamp,
            product_Id : req.body.cartId,
            isUser : req.session.userId,
            check : req.body.check,
        } */

exports.deleteAll = (req, res, next) => {
    modelCart.deleteAllMyCart(req.session.userId).then(() => {
        res.redirect("/cart");
    })
}




/**            <input type="hidden" name="amount" value="<%= amount%>">
            <input type="hidden" name="price" value="<%= price%>">
            <input type="hidden" name="productName" value="<%= product%>">
            <input type="hidden" name="timeStamp" value="<%= timeStamp%>"> */