const router = require("express").Router();
const controllOrder = require("../controllers/orders.controller");

const bodyParser = require("body-parser");
const authGuard  = require("./guards/auth.guard");
const check = require("express-validator").check;

router.get("/", controllOrder.getOrders);

router.post("/", authGuard.isAuth, bodyParser.urlencoded({extended : true}),
    check("address").not().isEmpty().withMessage("please write your address !!"),
    controllOrder.saveOrder,
    controllOrder.deleteCart,
    


)
router.post("/cancel", authGuard.isAuth,
    bodyParser.urlencoded({extended : true}),
    controllOrder.cancelOrder


)

router.post("/cancelAll", authGuard.isAuth,
    bodyParser.urlencoded({extended : true}),
    controllOrder.cancelAll
)


module.exports = router
