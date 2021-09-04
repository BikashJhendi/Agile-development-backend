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

describe('checkout testing', () => {
    test('responds with json', function (done) {
        request(app)
            .post('/mycheckout/insert')
            .send({

                itemcount: '2', totalamount: '299', totalamounttax: '399',
                myproduct: [{ 0: { productid: '198007', productquantity: '2', productname: 'jeans' } }],

                billingfirstname: 'rajesh', billinglastname: 'kasula', billingphone: '9090909099', billingemail: 'rk@gmail.com',
                billingaddress: 'Bhaktapur', billingzip: '44800', billingdistrict: 'bhaktapur', billingprovince: 'bagmati'

            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, { message: "successfull" })
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});