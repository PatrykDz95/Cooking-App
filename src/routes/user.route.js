const express = require("express");
const User = require("../models/User");
const router = express.Router();
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { sendWelcomeEmail } = require('../email/account')

router.get("/users", async (req, res, next) => {
    const users = await User.find();
	res.send(users);
});

router.get("/users/:id", async (req, res, next) => {
	const users = await User.findOne({ _id: req.params.id }).populate("Recipes").cache({key: req.params.user});
	res.send(users)
});

router.post('/user', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
		sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});


router.post('/users/login', async (req, res) => {
	User.findOne({
		name: req.body.name
	  })
		.exec((err, user) => {
		  if (err) {
			res.status(500).send({ message: err });
			return;
		  }
	
		  if (!user) {
			return res.status(404).send({ message: "User Not found." });
		  }
	
		  var passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		  );
	
		  if (!passwordIsValid) {
			return res.status(401).send({
			  accessToken: null,
			  message: "Invalid Password!"
			});
		  }
	
		//   const token = req.header('Authorization').replace('Bearer ', '')
        //   const decoded = jwt.verify(token, 'thisismynewcourse')
		  
		var token = jwt.sign({ id: user.id }, 'thisismynewcourse', {
			expiresIn: 86400 // 24 hours
		  });

		  res.status(200).send({
			id: user._id,
			name: user.name,
			email: user.email,
			accessToken: token
		  });
		});
	});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// router.post("/users", cleanCache, async (req, res, next) => {
// 	const users = new User({
// 		name: req.body.name,
// 		email: req.body.email,
//         password: req.body.password,
//         age: req.body.age
// 	});
// 	await users.save();
// 	res.send(users);
// })

module.exports = router;