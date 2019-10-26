
let authModel = require("../models/auth.model")
let validationResult = require("express-validator").validationResult;

// render the signup page
exports.getSignup = (req, res, next) => {
    res.render("signup", {
        authError : req.flash("authError")[0],
        validationErrors : req.flash("validationErrors"),
        isUser : false,
        isAdmin : false,
        title : "Signup"
    });
}

// create account 
exports.createAccount = (req, res, next) => {
    const errors = validationResult(req).array();
    if(errors.length !== 0){
        req.flash("validationErrors", errors);
        res.redirect("/signup");
    }else{
        authModel.createNewUser(req.body.username, req.body.email, req.body.password)
        .then(() => {
            res.redirect("/login");
        }).catch(err => {
            req.flash("authError", err);
            res.redirect("/signup");
        })
    }
}


// render the login page
exports.getLogin = (req, res, next) => {

    res.render("login", {
        authError : req.flash("authError")[0],
        validErrors : req.flash("validErrors"),
        isUser : false,
        isAdmin : false,
        title : "Login"
    });
}



// login in the website
exports.postLogin = (req, res, next) => {
    const validErrors = validationResult(req).array();
    // return console.log(validErrors);
    if(validErrors.length !== 0) {
        req.flash("validErrors", validErrors);
        res.redirect("/login");
    }else{
        authModel.login(req.body.email, req.body.password)
        .then((result) => {
            req.session.userId = result.id;
            req.session.isAdmin = result.isAdmin;
            res.redirect("/");
        }).catch(err => {
            req.flash("authError", err);
            res.redirect("/login");
        })
    }
    
}

// log out from website
exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
}