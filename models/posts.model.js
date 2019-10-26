const mongoose = require("mongoose");
const url_DB = "mongodb+srv://Diaa:zxczxczxc330@online-shop-ymjeu.mongodb.net/online-shop?retryWrites=true&w=majority";

const postSchema = mongoose.Schema({
    value : String,
    
})
const Post = mongoose.model("post", postSchema);

exports.savePosts = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(()=>{
            let post = new Post(data);
            return post.save()
        }).then((data) => {
            mongoose.disconnect();
            resolve(data)
        }).then(err => {
            mongoose.disconnect();
            reject();
        })
    })
}
exports.getPosts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB, {useNewUrlParser : true}).then(()=>{
            return Post.find();
        }).then((posts) => {
            mongoose.disconnect();
            resolve(posts)
        }).then(err => {
            mongoose.disconnect();
            reject();
        })
    })
}
