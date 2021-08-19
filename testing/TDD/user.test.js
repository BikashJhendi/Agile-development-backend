const users = require('../../models/users');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../App');

const url = 'mongodb://127.0.0.1:27017/DropShipping';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User image upload testing', () => {

    test('responds with json', function (done) {
        request(app)
            .put('/update/61069bcb0a1ec827a08829f1')
            .attach('img', 'assets/image/cosmetic/1626617500015Screenshot (61).png')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe('delete user', () => {

    test('responds with json', function (done) {
        request(app)
            .delete('/delete/kuhu@gmail.com')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe('display user using id', () => {

    test('shows user using id', (done) => {
        request(app)
            .get('/user/profile/61069bcb0a1ec827a08829f1')
            .set('Accept', 'application/charset=utf-8')
            .expect('Content-Type', /charset=utf-8/)
            .expect(200, done);
    });
});

describe('update user information', () => {
    test('responds with json',(done)=>{
        const updateInfo = {firstname:'Rajesh', lastname:'kasula', email:'rk00@gmail.com'}
       // const expectedResponse = {...users, ...updateInfo}
        request(app)
        .put('/user/profile/update/611e45b29fa24f2d589ff035')
        .send(updateInfo)
        .expect(200, done)
        // .end((err,res)=>{
        //     expect(res.body).toEqual(expectedResponse)
        //     done();
        // })
    })
});
