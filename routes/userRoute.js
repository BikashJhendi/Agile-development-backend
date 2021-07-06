const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users.js');


// User Signup
router.post('/user/signup',
	(req, res) => {
		// const errors = validationResult(req);
		//console.log(errors.array())

		// if (!errors.isEmpty()) {
		// 	res.send(errors.array());
		// }
		// else 
        // {
			const firstname = req.body.firstname;
			const lastname = req.body.lastname;
			const email = req.body.email;
			const phone = req.body.phone;
			const password = req.body.password;
            const district = req.body.district;
            const tole = req.body.tole;
			

			bcrypt.hash(password, 10, function (err, hash) {
				const userdata = new User({ firstname: firstname, lastname:lastname, email: email, phone:phone, password: hash, district:district, tole:tole});
				userdata.save()
					.then(function (result) {
						// success insert
						res.status(201).json({ message: "Registered success !!", success: true});

					})
					.catch(function (e) {
						res.status(500).json({ message: e , success: false})
					}
					)
			}
			)
		// }

	})
module.exports = router;