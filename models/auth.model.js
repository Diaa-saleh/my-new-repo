const mongoose = require("mongoose");
const bcrypt  = require("bcryptjs");
const url_DB = "mongodb+srv://Diaa:zxczxczxc330@online-shop-ymjeu.mongodb.net/online-shop?retryWrites=true&w=majority";
let userSchema = mongoose.Schema({
    username : String,
    email  : String,
    password : String,
    isAdmin : {
        type : Boolean,
        default : false
    }
})

let User = mongoose.model("user", userSchema);


exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB,{useNewUrlParser: true}).then(() => {
            return User.findOne({email : email})
        }).then(user => {
            if(user){
                mongoose.disconnect();
                reject("this email isn't vaild and it's exist here !");
            }else{
               return bcrypt.hash(password, 10)
            }
        }).then(hashedPassword => {
            let user = new User({
                username : username,
                email : email,
                password : hashedPassword,
            })
            return user.save();

        }).then(() => {
            mongoose.disconnect();
            resolve();
            
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}


exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB).then(() => {
            return User.findOne({email: email});
        })
        .then(user => {
            if(!user) {
                mongoose.disconnect();
                reject("this email is invalid");
            }else{
                bcrypt.compare(password, user.password).then(same => {
                    if(!same){
                        mongoose.disconnect();
                        reject("this password is't correct");
                    }else{
                        mongoose.disconnect();
                        resolve({
                            id : user._id,
                            isAdmin : user.isAdmin
                        });
                    }
                })
            }
       
        }).catch(err => {
            mongoose.disconnect();
            console.log(err);
        })
    })
};

exports.getEmails = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            return User.find();
        }).then(users => {
            
            mongoose.disconnect();
            resolve(users);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.getUserEmail = (email) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(() => {
            
            return User.find({email : email});
        }).then(users => {
            console.log(users)
            mongoose.disconnect();
            resolve(users);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}