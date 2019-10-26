const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const controlCart = require("../controllers/cart.controller");
const authCart = require("./guards/auth.guard");


router.get("/", authCart.isAuth, controlCart.getCart);

router.post("/",
    authCart.isAuth, bodyParser.urlencoded({extended : true}),
    check("amount").not().isEmpty()
    .withMessage("please fill amount input")
    .isInt({min : 1}).withMessage("this value less than 1"),
    controlCart.controllerCart
);

router.post("/save", 
    authCart.isAuth, bodyParser.urlencoded({extended : true}),
    check("amount").not().isEmpty()
    .withMessage("please fill amount input")
    .isInt({min : 1}).withMessage("this value less than 1"),
    controlCart.saveData
);
router.post("/delete",
    authCart.isAuth,
    bodyParser.urlencoded({extended : true}),
    controlCart.deleteData
);


// router.get("/verfiyorder", authCart.isAuth, bodyParser.urlencoded({extended :true}),
//  controlCart.getorder
// );

router.post("/verfiyorder",
    authCart.isAuth,
    bodyParser.urlencoded({extended :true}),
    check("amount").not().isEmpty().withMessage("Fill amount input")
    .isInt({min : 1}).withMessage("the amount value less than 1"),
    controlCart.postOrder
);
router.post("/orderAll",
    authCart.isAuth,
    bodyParser.urlencoded({extended :true}),
    check("amount").not().isEmpty().withMessage("Fill amount input")
    .isInt({min : 1}).withMessage("the amount value less than 1"),
    controlCart.postOrders
);

router.post("/deleteAll",
    authCart.isAuth,
    bodyParser.urlencoded({extended :true}),    
    controlCart.deleteAll
);
module.exports = router