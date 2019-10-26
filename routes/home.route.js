
const router = require('express').Router();
const bodyParser = require("body-parser");

let homeController = require('../controllers/home.controller');

router.get('/', homeController.getHome);
router.post("/kk", bodyParser.json(), homeController.getPosts)
router.post("/hello", bodyParser.json(), homeController.postData);


module.exports = router