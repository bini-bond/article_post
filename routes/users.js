var express = require('express');
var router = express.Router();
var user_controller = require('../user_controller/user_controller');
var {Post} = require('../models/Post');
var {User} = require('../models/User');
var {authenticate} = require('../Auth/authenticate');

 
router.get('/profile',authenticate, user_controller.profile);



router.delete('/logout', authenticate,user_controller.logout );

router.post('/login',user_controller.login );



router.post('/register',user_controller.register );
module.exports = router;
