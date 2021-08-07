const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const uploadImg = require('../middleware/userImg.js');
const mail = require('../mail/mail.js')


// User Signup
router.post('/user/signup',
	function (req, res) {
		const { firstname, lastname, email, password } = req.body;

		bcrypt.hash(password, 10, function (err, hash) {
			const userdata = new User({ firstname, lastname, email, password: hash });
			userdata.save()
				.then(function (result) {
					// success insert
					res.status(201).json({
						message: "Registered success !!",
						success: true
					});

					// creates token 
					const verifyToken = jwt.sign({
						email: userdata.email, registeredDate: userdata.registeredDate
					}, 'secretKey', { expiresIn: '1d' });

					mail.validation_mail(firstname, email, verifyToken)
				})
				.catch(function (err) {
					res.status(500).json({
						message: err,
						success: false
					})
				})
		})
	})


router.put('/user/email/verify/:token',
	function (req, res) {
		const { token } = req.params;
		const decode = jwt.verify(token, "secretKey", (err, decoded) => {
			if (err) {
				return res.status(404).json({
					message: "Broken Link or Token Expried.",
					success: false
				})
			}

			return decoded;
		});

		const { email } = decode;

		User.find({ email: email })
			.then(function (data) {

				User.updateOne({ email: email }, { verified: true })
					.then(function (data) {
						res.status(200).json({
							message: "Email Verified",
							success: true
						})
					})
					.catch(function (err) {
						res.status(401).json({
							message: "Can't verified email.",
							success: false
						})
					})
			})
			.catch(function (err) {
				res.status(500).json({
					message: err,
					success: false
				})
			})
	})

// login
router.post('/user/login',
	function (req, res) {
		const { email, password } = req.body;

		User.findOne({ email: email })
			.then(function (userdata) {
				if (userdata == null) {
					return res.status(403).json({
						message: "email or password is incorrect",
						success: false
					})
				}
				bcrypt.compare(password, userdata.password, function (err, result) {
					if (result === false) {
						return res.status(403).json({
							message: "email or password is incorrect",
							success: false
						})
					}

					// creates token 
					const token = jwt.sign({
						userId: userdata._id, firstName: userdata.firstname, lastName: userdata.lastname,
						email: userdata.email, img: userdata.img, userType: userdata.userType
					}, 'secretKey');

					res.status(200).json({
						message: "login success",
						success: true,
						token: token,
						userType: userdata.userType,
						userid: userdata._id
					})
				})
					.catch(function (err) {
						res.status(500).json({ // 500 internal server error
							success: false,
							message: "Server Error",
							error: err
						});
					})
			})
	})

router.put('/update/:id',
	uploadImg.single('img'),
	function (req, res) {
		const { id } = req.params;

		User.findOne({ _id: id })
			.then(function (userData) {

				return User.updateOne({ _id: id }, { img: req.file.filename })
					.then(function (result) {
						res.status(200).json({ // 200 OK 
							success: true,
							message: "Account successfully updated."
						})
					})
					.catch(function (err) {
						res.status(500).json({ // 500 Internal Server Error
							success: false,
							message: "Unable to update account.",
							error: err
						});
					})
			})
	})

// decoding token
router.get('/user/token/decode',
	function (req, res) {
		const token = req.headers.authorization.split(" ")[1];

		if (token === "null") {
			return res.status(400).json({
				message: "Didn't find token."
			})
		}
		else {
			const decode = jwt.verify(token, "secretKey");
			const { userId, firstName, lastName, email, img, userType } = decode;

			res.status(200).json({
				userId,
				firstName,
				lastName,
				email,
				img,
				userType
			})
		}
	})

// delete
router.delete('/delete/:email',
	function (req, res) {
		const { email } = req.params;

		User.deleteOne({ email: email })
			.then(function (result) {
				res.status(200).json({ message: "User deleted", success: true })
			})
			.catch(function (err) {
				res.status(500).json({ message: "unable to add" })
			})
	}
)

// user get
router.get('/user/profile/:id', function (req, res) {
    const uid = req.params.id
    Users.findOne({ _id: uid })
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})

module.exports = router;