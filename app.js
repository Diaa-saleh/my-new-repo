const express = require('express');
let app = express();
let path = require('path');

// to make the req hold messages to all routs i want to get it or post or put ...
let flash = require("connect-flash");

// require our custom modules
let homeRoute = require('./routes/home.route');
let productRoute = require('./routes/product.route');
let signupRoute = require("./routes/auth.route");
let cartRoute = require("./routes/cart.route");
let orderRoute = require("./routes/orders.route");
let adminRoute = require("./routes/admin.route");
// to make session to user
const session = require("express-session");
// to connect between database and session to store the session inside the database
const SessionStore = require("connect-mongodb-session")(session)

// use static file
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));

// use flash as middleware
app.use(flash());

// create object from constructor hold the store place
const STORE = new SessionStore({
    uri : "mongodb+srv://Diaa:zxczxczxc330@online-shop-ymjeu.mongodb.net/online-shop?retryWrites=true&w=majority",
    collection : "sessions"
});

// use the session as middle ware and give it the
// information that i want it happen when create session
app.use(session({
    secret : "i love javascript very much ....",
    saveUninitialized : false,
    cookie : {
        maxAge : 3*60*60*100, // by millsecond
        expires : false
    },
    store : STORE,
}));

// use the template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// use routes
app.use('/', homeRoute)
app.use('/product', productRoute);
app.use("/", signupRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);
app.use("/admin", adminRoute);

app.get("/error", (req, res, next) => {
    res.status(404)
    res.render("errors.ejs", {
        isUser : req.session.userId,
        isAdmin : req.session.isAdmin,
        err : "The Data Not Found",
        title : "error"
    })
})
app.use((error, req, res, next) => {
    res.redirect("/error");
})
app.get('*', function(req, res) {  res.render('Not-Found',{
        isUser : req.session.userId,
        isAdmin : req.session.isAdmin,
        title : "error"
});});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('this server listen on port ' + port);
})