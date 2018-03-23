var express = require('express');
var router = express.Router();
var {Post} = require('../models/Post');
var {User} = require('../models/User');
var post_controller = require('../post_controller/post_controller');
var { authenticate } = require('../Auth/authenticate');

router.post('/add',authenticate,post_controller.add);


module.exports=router;