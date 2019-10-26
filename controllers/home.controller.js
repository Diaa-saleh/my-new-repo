
let productModel = require('../models/products.model');
let postsModel = require("../models/posts.model");

exports.getHome = (req, res, next) => {
    

    // get catogery
    // if catogery and !== all
    // filter the data by catogery
    // else
    // show all data

    let catogery = req.query.catogery;
    console.log(catogery);
    let validateCatogery = ['phones', 'computers', 'clothes','test'];
    if(catogery && validateCatogery.includes(catogery)){
        productModel.getAllProductsByCatogeries(catogery).then(products => {
            postsModel.getPosts().then((posts) => {
                res.render("index", {
                    amountError : req.flash("amountError")[0],
                    products : products,
                    isUser : req.session.userId,
                    isAdmin : req.session.isAdmin,
                    posts : posts,
                    title : "Home"
                })
            }).catch(err => {
                res.redirect("/error")
            })
        })
    }else{
        productModel.getAllProducts().then(products => {
            postsModel.getPosts().then((posts) => {
                res.render("index", {
                    amountError : req.flash("amountError")[0],
                    products : products,
                    isUser : req.session.userId,
                    isAdmin : req.session.isAdmin,
                    posts : posts,
                    title : "Home"
                })
            }).catch(err => {
                res.redirect("/error")
            })
           
        })
    }
    
}

exports.postData = (req, res, next) => {
    postsModel.savePosts({value : req.body.value})
    .then((data) => {
        res.send(data)
    })
    // console.log(req.body)
    // console.log(req.method)
    
}
exports.getPosts = (req, res, next) => {
    postsModel.getPosts().then((posts) => {
        
        res.send(posts)
    })
}