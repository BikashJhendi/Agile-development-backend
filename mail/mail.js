const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');
const hbs = require('hbs');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, USER_EMAIL } = require('./config');
// var htmlstream = fs.createReadStream("./mail/test.html");
// var compileTe = compile(htmlstream);

var template = fs.readFileSync('./mail/test.hbs', 'utf-8');
var compileTemplate = hbs.compile(template);

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

function validation_mail(first, recipient_email) {
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
        from: `"Dhuwani Team" <${USER_EMAIL}>`,
        to: recipient_email,
        subject: 'Testing',
        html: template,
        context: {
            first: first
        }
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error Occurs', err);
        }
        else {
            console.log('Email sent!!!!', data);
        }
        transporter.close()
    })
}

module.exports = {
    validation_mail
};