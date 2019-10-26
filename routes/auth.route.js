const router = require("express").Router();
let bodyParser = require("body-parser");
let authController = require("../controllers/auth.controller");
let authGuard = require("./guards/auth.guard")

let check = require("express-validator").check;

router.get("/signup", authGuard.notAuth, authController.getSignup);

router.post("/signup", authGuard.notAuth,

 bodyParser.urlencoded({extended: true}),
 [
    check("username").not().isEmpty().withMessage("please fill the user name field"),
    check("email").not().isEmpty().withMessage("please fill the user email field")
    .isEmail().withMessage("please isert correct email"),
    check("password").not().isEmpty().withMessage("please fill the password field")
    .isLength({min : 6}).withMessage("the min length of password is 6 letters"),
    check("confirmPassword").custom((value, {req}) => {
        if(value != req.body.password){
            throw new Error("this value isn't match with password");
        }else{
            return true
        }
    })
],
  authController.createAccount);

router.get("/login", authGuard.notAuth, authController.getLogin);

router.post("/login", authGuard.notAuth, bodyParser.urlencoded({extended: true}),

[
    check("email").not().isEmpty().withMessage("fill email field")
    .isEmail().withMessage("this email isn't correct !"),
    check("password").not().isEmpty().withMessage("please fill pass field")
    .isLength({min : 6}).withMessage("the min length of pass 6 letter")
],
authController.postLogin);

router.all("/logout", authGuard.isAuth, authController.logout);

module.exports = router;