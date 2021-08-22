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
						email: userdata.email
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

// Email validation
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
			else {
				return decoded;
			}

		});

		if (decode.email) {
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
							if (err) {
								return res.status(401).json({
									message: "Can't verified email.",
									success: false,
									error: err
								})
							}
						})
				})
				.catch(function (err) {
					res.status(500).json({
						message: err,
						success: false
					})
				})
		}
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
						email: userdata.email, phone: userdata.phone, addressBook: userdata.addressBook,
						img: userdata.img, userType: userdata.userType
					}, 'secretKey');

					res.status(200).json({
						message: "login success",
						success: true,
						token: token,
						userType: userdata.userType,
						userid: userdata._id,
						verified: userdata.verified
					})
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

// send validation mail again 
router.post('/login/send/validation-mail',
	function (req, res) {
		const token = req.headers.authorization.split(" ")[1];
		const decode = jwt.verify(token, "secretKey");

		if (token === "null") {
			return res.status(400).json({
				message: "Didn't find token."
			})
		}
		else {
			const { firstName, email } = decode;

			// creates token 
			const verifyToken = jwt.sign({
				email: email
			}, 'secretKey', { expiresIn: '1d' });

			mail.validation_mail(firstName, email, verifyToken)

			res.status(200).json({
				message: "Email Sent!!!",
				success: true
			})

		}
	})

// user profile update
router.put('/user/profile/update/:id',
	uploadImg.single('img'),
	function (req, res) {
		const { id } = req.params;
		const { firstname, lastname, email, password, currentPassword, phone,
			zone, district, address, tole } = req.body;

		User.findOne({ _id: id })
			.then(function (userData) {
				if (userData == null) {
					return res.status(403).json({ // 403 Forbidden
						success: false,
						message: "User Data. Not Found!!!"
					})
				}

				// if image is null
				if (!req.file) {
					// if password isn't null 
					if (password) {
						return bcrypt.compare(currentPassword, userData.password, function (error, result) {
							if (result == false || error) {
								return res.status(403).json({ // 403 Forbidden
									success: false,
									message: "Invalid Current Password!!!",
									err: error || result
								})
							}

							bcrypt.hash(password, 10, function (err, hash) {
								if (err) {
									return res.status(500).json({ // 500 Internal Server Error
										success: false,
										message: "Failed to hash password.",
										error: err
									});
								}

								return User.updateOne({ _id: id }, {
									firstname, lastname, email, phone, password: hash,
									addressBook: { zone, district, address, tole }
								})
									.then(function (result) {
										User.findOne({ _id: id })
											.then((result) => {
												// creates token 
												const token = jwt.sign({
													userId: result._id, firstName: result.firstname, lastName: result.lastname,
													email: result.email, phone: result.phone, addressBook: result.addressBook,
													img: result.img, userType: result.userType
												}, 'secretKey');

												return res.status(200).json({ // 200 OK 
													success: true,
													message: "Account successfully updated.",
													token: token
												})
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
					}
					// if password is null
					else {
						return User.updateOne({ _id: id }, {
							firstname, lastname, email, phone,
							addressBook: { zone, district, address, tole },
						})
							.then(function (result) {
								User.findOne({ _id: id })
									.then((result) => {
										// creates token 
										const token = jwt.sign({
											userId: result._id, firstName: result.firstname, lastName: result.lastname,
											email: result.email, phone: result.phone, addressBook: result.addressBook,
											img: result.img, userType: result.userType
										}, 'secretKey');

										return res.status(200).json({ // 200 OK 
											success: true,
											message: "Account successfully updated.",
											token: token
										})
									})
							})
							.catch(function (err) {
								res.status(500).json({ // 500 Internal Server Error
									success: false,
									message: "Unable to update account.",
									error: err
								});
							})
					}
				}
				// if image isn't null
				else {
					// if password isn't null 
					if (password) {
						return bcrypt.compare(currentPassword, userData.password, function (error, result) {
							if (result == false || error) {
								return res.status(403).json({ // 403 Forbidden
									success: false,
									message: "Invalid Current Password!!!",
									err: error || result
								})
							}

							bcrypt.hash(password, 10, function (err, hash) {
								if (err) {
									return res.status(500).json({ // 500 Internal Server Error
										success: false,
										message: "Failed to hash password.",
										error: err
									});
								}

								return User.updateOne({ _id: id }, {
									firstname, lastname, email, phone, password: hash,
									addressBook: { zone, district, address, tole },
									img: req.file.filename
								})
									.then(function (result) {
										User.findOne({ _id: id })
											.then((result) => {
												// creates token 
												const token = jwt.sign({
													userId: result._id, firstName: result.firstname, lastName: result.lastname,
													email: result.email, phone: result.phone, addressBook: result.addressBook,
													img: result.img, userType: result.userType
												}, 'secretKey');

												return res.status(200).json({ // 200 OK 
													success: true,
													message: "Account successfully updated.",
													token: token
												})
											})
									})
									.catch(function (err) {
										return res.status(500).json({ // 500 Internal Server Error
											success: false,
											message: "Unable to update account.",
											error: err
										});
									})
							})
						})
					}
					// if password is null
					else {
						return User.updateOne({ _id: id }, {
							firstname, lastname, email, phone,
							img: req.file.filename,
							addressBook: { zone, district, address, tole },
						})
							.then(function (result) {
								User.findOne({ _id: id })
									.then((result) => {
										// creates token 
										const token = jwt.sign({
											userId: result._id, firstName: result.firstname, lastName: result.lastname,
											email: result.email, phone: result.phone, addressBook: result.addressBook,
											img: result.img, userType: result.userType
										}, 'secretKey');

										return res.status(200).json({ // 200 OK 
											success: true,
											message: "Account successfully updated.",
											token: token
										})
									})
							})
							.catch(function (err) {
								return res.status(500).json({ // 500 Internal Server Error
									success: false,
									message: "Unable to update account.",
									error: err
								});
							})
					}
				}

			})
			.catch((err) => {
				return res.status(500).json({ // 500 Internal Server Error
					success: false,
					message: "Unable to update account.",
					error: err
				});
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
			const { userId, firstName, lastName, email, phone, img, userType, addressBook } = decode;

			res.status(200).json({
				userId,
				firstName,
				lastName,
				email,
				phone,
				img,
				userType,
				addressBook
			})
		}
	})

// forget password
router.put('/user/forgot',
	function (req, res) {
		const { email } = req.body;

		User.findOne({ email: email })
			.then(function (userData) {
				if (!userData) {
					return res.status(400).json({
						message: "Email doesn't exist.",
						success: false,
						data: userData
					})
				}
				else {
					const { firstname } = userData;
					// generate random password
					randPass = Math.random().toString(32).toUpperCase().slice(-4) + Math.random().toString(32).toLowerCase().slice(-4)

					bcrypt.hash(randPass, 10, function (err, hash) {
						return User.updateOne({ email: email }, { password: hash, verified: true })
							.then(function (data) {
								if (!data) {
									return res.status(400).json({
										message: "Failed to reset Password.",
										success: false,
										data: data
									})
								}

								mail.forgotPassword(firstname, randPass, email)

								res.status(200).json({
									message: "Password reset succesfully.",
									success: true,
									data: data
								})
							})
							.catch(function (err) {
								return res.status(400).json({
									message: "Failed to reset Password.",
									success: false,
									error: err
								})
							})
					})

				}
			})
			.catch(function (err) {
				res.status(500).json({
					message: "Email doesn't exist.",
					success: false,
					error: err
				})
			})
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
	User.findOne({ _id: uid })
		.then(function (data) {
			res.status(200).json(data);
		})
		.catch(function (e) {
			res.status(500).json({ message: e })
		})
})

// get all data
router.get('/getall',
	function (req, res) {
		User.find()
			.then(function (data) {
				res.status(200).json({
					message: "all data ",
					data: data
				})
			})
	})

// delete all user
router.delete('/deleteall',
	function (req, res) {
		User.deleteMany()
			.then(function (data) {
				res.status(200).json({
					message: "all data delete",
					data: data
				})
			})
	})

module.exports = router;