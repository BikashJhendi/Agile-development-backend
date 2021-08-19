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

describe('User login testing', () => {

    it('find user with id', () => {
        return users.findOne({ _id: Object('60f7e98547ed341dac29ec60') })
    });

    //  it('user logins using valid email address',()=>{
    //     return users.findById('60ed73f0ec08c60210d1e95a')
    //     .then((u)=>{
    //         expect('Bikash@123.com').toEqual(u.email);
    //         expect('1234').toEqual(u.password);
    //     })
    //  })

    describe('user login successfully with valid email address', function () {
        it('responds with json', function (done) {
            request(app)
                .post('/user/login')
                .send({ email: 'Rk@123.com' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
    });

    describe('user login error if email is invalid', function () {
        it('responds with json', function (done) {
            request(app)
                .post('/user/login')
                .send({ email: 'invalidEmail@123.com' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(403, { message: 'email or password is incorrect', success:false })
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
    });
})
