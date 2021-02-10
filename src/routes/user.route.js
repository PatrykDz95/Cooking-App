const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all posts
router.get("/users", async (req, res) => {
	try{
    const users = await User.find();
	res.send(users);
}
catch(e) {
  console.log('Catch an error: ', e)
} 
})

router.get("/users/:id", async (req, res) => {
	const users = await User.findOne({ _id: req.params.id })
	res.send(users)
})

router.post("/users", async (req, res) => {
	const users = new User({
		name: req.body.name,
		email: req.body.email,
        password: req.body.password,
        age: req.body.age
	})
	await users.save();
	res.send(users);
})

module.exports = router;