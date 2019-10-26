let productModels = require("../models/products.model");

exports.getProduct = (req, res, next) => {
    // get id
    let id = req.params.id;

    productModels.getProductById(id).then(product => {
        res.render("product", {
            product : product,
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            amountError : req.flash("amountError")[0],
            title : "Product"
        })
    }).catch(err => {
        res.redirect("/error")
    })

}
exports.getFirstProduct = (req, res, next) => {
    productModels.getFirstPro().then(product => {
        res.render("product", {
            product : product,
            isUser : false,
            isAdmin : req.session.isAdmin,
            amountError : req.flash("amountError")[0],
            title : "Product"
        })
    }).catch(err => {
        res.redirect("/error")
    })

}