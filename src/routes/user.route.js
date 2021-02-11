const express = require("express");
const User = require("../models/User");
const router = express.Router();
const cleanCache = require('../middleware/cleanCache');

// Get all posts
router.get("/users", async (req, res, next) => {
	try{
    const users = await User.find().cache();
	res.send(users);
}
catch(e) {
  console.log('Catch an error: ', e)
} 
})

router.get("/users/:id", async (req, res, next) => {
	const users = await User.findOne({ _id: req.params.id }).cache({key: req.params.user});
	res.send(users)
})

router.post("/users", cleanCache, async (req, res, next) => {
	const users = new User({
		name: req.body.name,
		email: req.body.email,
        password: req.body.password,
        age: req.body.age
	});
	await users.save();
	res.send(users);
})

module.exports = router;