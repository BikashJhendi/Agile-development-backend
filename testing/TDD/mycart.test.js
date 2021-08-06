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

describe('add to cart testing', () => {
    test('responds with json', function (done) {
        request(app)
            .post('/gadgetcart/insert')
            .send({ gadgetname: 'brush', gadgetprice: '90', quantity: '1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, { message: "cart Added" })
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    test('display cart', (done) => {
        request(app)
            .get('/mycart/showall')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(200, done);
    });

    test('shows one product using its id', (done) => {
        request(app)
            .get('/gadget/one/610bf4f846198446a08c0c27')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(200, done);
    })
});

describe("delete from cart", () => {
    test("delete one item from cart using id", (done) => {
        request(app)
            .del('/delete/mycart/610d0911522210439452ded8')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(200, done);
    })

    test("delete every item from cart", (done) => {
        request(app)
            .delete('/delete/mycart')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
});