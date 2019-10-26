
const adminModel = require("../models/admin.model");
const validationResult = require("express-validator").validationResult;
const productModel = require("../models/products.model");
const orderModel = require("../models/orders.model");
const userModel = require("../models/auth.model");
exports.getAddProduct = (req, res, next) => {
    res.render("add-product", {
        validationErrors : req.flash("validationErrors"),
        isUser : true,
        isAdmin: true,
        title : "AddProduct"
    })
}

exports.postProduct = (req, res, next) => {
    let errors = validationResult(req).array();
    if(errors.length !== 0) {
        req.flash("validationErrors", errors);
        res.redirect("/admin/add");
    }else{
        console.log(req.body)
        console.log(req.file);

        productModel.addProduct({
            name : req.body.name,
            price : req.body.price,
            category : req.body.category,
            description : req.body.description,
            image : req.file.filename
        }).then(() => {
            res.redirect("/admin/add")
        })
    }
}

exports.getManageOrders = (req, res, next) => {
    console.log(req.query.search);
    let status = req.query.status;
    let search = req.query.search;
    let validationStatus = ["pending", "sent", "completed"];
    
    if(status && validationStatus.includes(status)) {
        orderModel.getOrderByStatus(status).then((orders) => {
        // //     console.log(orders)
        // //     orderModel.getOrdersModel().then((orders) => {
            // console.log(orders)
            /*
            (function loop(i) {
                if (i < orders.length) {
                    userModel.getEmail(orders[i].id).then(user => {
                        res.render("manage-orders", {
                            isUser : true,
                            isAdmin : true,
                            orders : orders,
                            email : user.email
                        })
                    }).then(loop.bind(null, i+1));
                }
            })(0);
            */
            userModel.getEmails().then(users => {
                res.render("manage-orders", {
                    isUser : true,
                    isAdmin : true,
                    orders : orders,
                    users : users,
                    title : "manage-orders"
                })
                
            }).catch(err => {
                next(err)
            })
        }) 
        // //     for(let order of orders){
        // //         userModel.getEmail(order.id).then(user => {
        // //             res.render("manage-orders", {
        // //                 isUser : true,
        // //                 isAdmin : true,
        // //                 orders : orders,
        // //                 email : user.email
        // //             })
        // //         }).catch(err => {
        // //             console.log(err);
        // //         })
        // //     }
            
        // // }).catch(err => {
        // //     console.log(err);
        // // })
    
    }else if(search){ 
        userModel.getUserEmail(search).then((users) => {
            orderModel.getOrdersOfThisEmail(users[0]._id).then((orders) => {
                res.render("manage-orders", {
                    isUser : true,
                    isAdmin : true,
                    orders : orders,
                    users : users,
                    title : "manage-orders"
                });
            }).catch(err => {
                res.redirect("/error")
            })
        }).catch(err => {
            next(err)
        })
    }else{
        orderModel.getOrdersModel().then((orders) => {
            // console.log(orders);
           /** [...Array(orders.length)].reduce( (p, _, i) => 
                p.then(_ => userModel.getEmail(orders[i].id).then(user => {
                    console.log("new email " + user.email)
                    res.render("manage-orders", {
                        isUser : true,
                        isAdmin : true,
                        orders : orders,
                        email : user.email
                    })
                }))
            , Promise.resolve() ); */
            
            userModel.getEmails().then(users => {
                res.render("manage-orders", {
                    isUser : true,
                    isAdmin : true,
                    orders : orders,
                    users : users,
                    title : "manage-orders"
                })
                
            }).catch(err => {
                next(err)
            })
                
            
            // return [orders, array]
            
        }).catch(err => {
            next(err)
        })   
        //     for(let order of orders){
        //         userModel.getEmail(order.id).then(user => {
        //             res.render("manage-orders", {
        //                 isUser : true,
        //                 isAdmin : true,
        //                 orders : orders,
        //                 email : user.email
        //             })
        //         }).catch(err => {
        //             console.log(err);
        //         })
        //     }
            
        // }).catch(err => {
        //     console.log(err);
        // })
        
    }
}
exports.saveStatus = (req, res, next) => {
    console.log(req.body.status)
    console.log(req.body.product_Id)
    orderModel.editStatus(req.body.product_Id, {status : req.body.status})
    .then(() => {
        res.redirect("/admin/orders");
    })
}