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

describe('User registration testing', () => {
    //the code below is for insert testing

    //  it('Add new user with its details', () => {
    //     const user = {
    //         'firstname':'Bikash',
    //         'lastname':'Kasula',
    //         'phone':'0000000000',
    //         'district':'Bhaktapur',
    //         'tole':'bkt',
    //         'email': 'bikash@123.com',
    //         'password': '1234',
    //         };

    //     return users.create(user)
    //     // .then((pro_ret) => {
    //     //     expect(pro_ret.email).toEqual('bikash@123.com');
    //     //  });
    //  });

    describe('Register new user with valid informations', function () {
        it('responds with json', function (done) {
            request(app)
                .post('/user/signup')
                .send({ firstname: 'Rajesh', lastname: 'Kasula', email: 'Rk@123.com', password: '1234', district: 'bkt', phone: '9090', tole: 'bkt' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201, { message: "Registered success !!", success: true })
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
    });

    describe('Error if try to register with same email twice', function () {
        it('responds with json', function (done) {
            request(app)
                .post('/user/signup')
                .send({ firstname: 'RK', lastname: 'Ka', email: 'Rk@123.com', password: '1234', district: 'bkt', phone: '9090', tole: 'bkt' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
    });
})
