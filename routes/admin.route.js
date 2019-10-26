const router = require("express").Router();
const adminControl = require("../controllers/admin.controller");
const adminGuard = require("./guards/admin.guard");
const check = require("express-validator").check;
const multer = require("multer");
const bodyparser = require("body-parser");


let storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "images");
    },
    filename : (req, file, cb) => {
        cb(null, Date.now()+ "-" + file.originalname)
    }
})
router.get("/add",adminGuard.authAdmin, adminControl.getAddProduct);

router.post("/add",adminGuard.authAdmin,

multer({storage : storage}).single("image"),
check("name").not().isEmpty().withMessage("name is required"),
check("price").not().isEmpty().withMessage("price is required"),
check("category").not().isEmpty().withMessage("category iss required"),
check("description").not().isEmpty().withMessage("descripe the product"),
check("image").custom((value, {req}) => {
    if(req.file) return true
    else throw "this image is required"
}),

adminControl.postProduct
);


router.get("/orders", adminGuard.authAdmin, adminControl.getManageOrders);


router.post("/orders/save", adminGuard.authAdmin, 
bodyparser.urlencoded({extended: true}), adminControl.saveStatus);

module.exports = router