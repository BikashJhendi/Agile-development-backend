const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs'), path = require('path');
const Handlebars = require('handlebars');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, USER_EMAIL, FRONTEND_HOST } = require('./config');

var template = fs.readFileSync(path.join(__dirname, '../views/mailTemplate/confirmEmail.hbs'), 'utf-8');
var compileTemplate = Handlebars.compile(template);

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

function validation_mail(firstName, recipient_email, verifyToken) {
    const accessToken = oAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: USER_EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    });

    // var test = compileTemplate.render({ first: 'name' })

    const mailOptions = {
        from: `"Dhuwani" <${USER_EMAIL}>`,
        to: recipient_email,
        subject: 'Email Verification Mail',
        html: compileTemplate({ firstName, verifyToken, FRONTEND_HOST })
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err)
            // res.status(400).json({
            //     message: err,
            //     sucess: false
            // })
            // return err;
        }
        else {
            console.log('Email Sent!!!', data);
            // res.status(200).json({
            //     message: data,
            //     sucess: true
            // })
        }
        transporter.close()
    })

}

module.exports = {
    validation_mail
};