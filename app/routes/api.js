var User = require('../model/user');
var Story = require('../model/story');
var config = require('../../config'); 
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
	var token = jsonwebtoken.sign({
		id: user._id,
		name: user.name,
		username: user.username
	}, secretKey, {
		expiresIn: 1440
	});

	return token;
}
module.exports = function(app, express){
	var api = express.Router();
	api.post('/signup', function(req,res){
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		user.save(function(err){
			if(err){
				res.send(err);
				return;
			}

			res.json({message:"User has been created!"});

		});
	});

	api.get('/users',function(req,res){
		User.find({},function(err, users){
			if(err){
				res.send(err);
				return;
			}
			res.json(users);
		});
	}); 

	api.post('/login', function(req, res){
		User.findOne({
			username:req.body.username
		}).select('password').exec(function(err, user){
			if(err) throw err;

			if(!user){
				res.send({message: "User not found!"});
			}else if(user){
				var validPassword = user.comparePassword(req.body.password);

				if(!validPassword){
					res.send({message: "Wrong user password"});
				}else{
					var token = createToken(user);
					res.json({
						success: true,
						message: "Successfully login!",
						token: token
					});
				}
			}
		});
	});

	api.get('/me', function(req, res){
		res.json(req.decoded);
	});

	api.use(function(req, res, next){
		console.log("Somebody logged in!");
		var token = req.body.token || req.headers['x-access-token'];

		if(token){
			jsonwebtoken.verify(token, secretKey, function(err, decode){
				if(err){
					res.status(403).send({success:false, message:"Failed to authenticate!"});
				}else{
					req.decoded = decode;
					next();
				}
			})
		}else{
			res.status(403).send({success:false, message:"No token"});
		}
	});

	api.route('/addstory')
		.post(function(req, res){
			var story = new Story({
				creator: req.decoded.id,
				content: req.body.content,
				created: Date.now()
			});

			story.save(function(err){
				if(err){
					res.send(err); return;
				}
				res.json({message:"Story created!"});
			});
		})
		.get(function(req,res){
			Story.find({creator: req.decoded.id}, function(err, story){
				if(err){
					res.send(err);
					return;
				}
				res.json(story);
			});
		}); 

	

	return api;
}