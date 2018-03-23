var { Post } = require('../models/Post');
var { User } = require('../models/User');
var { authenticate } = require('../Auth/authenticate');

exports.add = (req, res) => {
    var title = req.body.Title;
    console.log(req.body.Title);


    var content = req.body.Content;
    post = new Post({ Title: title, Content: content, Owner: req.user.Email });
    post.save();
    res.send(post);
};