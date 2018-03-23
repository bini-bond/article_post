var { Post } = require('../models/Post');
var { User } = require('../models/User');
var { authenticate } = require('../Auth/authenticate');

exports.profile = function (req, res){
    var posts;
    // console.log(req.token);
    var info;
    var lock = {
        FirstName: null,
        Posts: []
    };
    // console.log(req.user);
    Post.find((err, data) => {
        // console.log(data);
        if (err) {
            console.log(err);
        }
        posts = data;
        lock.Posts = posts;
    });
    User.findOne({ Email: req.user.Email }, (err, data) => {

        if (data) {
            console.log("-------------------");
            console.log(data);
            info = data.FirstName;
            console.log(info + "");
        }

        lock.FirstName = info;

        console.log("Data");
        console.log(info + "check");
        console.log(lock);
        res.send(lock);
    });
    console.log("Data");

};

exports.logout = (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
};

exports.login = (req, res) => {
    var email = req.body.Email;
    var password = req.body.Password;

    User.findByCredentials(email, password).then((user) => {

        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(token);
        });
    }).catch((e) => {
        res.status(400).send("Invalid email or password");
    });
};


exports.register = (req, res) => {
    console.log(req.body.FirstName);
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var UserName = req.body.UserName;
    var Email = req.body.Email;
    var Password = req.body.Password;

    console.log(FirstName);
    console.log(Password);

    console.log(req.body);



    console.log("User");
    var user = new User(
        {
            FirstName: FirstName,
            LastName: LastName,
            UserName: UserName,
            Email: Email,
            Password: Password,






        });
    console.log(user);




    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        console.log("token");

        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });



}