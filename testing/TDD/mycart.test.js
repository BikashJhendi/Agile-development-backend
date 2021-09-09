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
    // test('responds with json', function (done) {
    //     if (done.length == 0) {
    //         request(app)
    //             .post('/mycart/insert')
    //             .field({
    //                 productid: '6134bd0d9486fe4aaca8a808', productname: 'brush', productprice: '90', quantity: '1',
    //                 producttype: 'Perfume'
    //             })
    //             .attach('productimage', 'assets/image/cosmetic/1629993345326bonfire.jpg')
    //             .set('Accept', 'application/json')
    //             .expect('Content-Type', /json/)
    //             .expect(201, { message: "cart Added" })
    //             .end(function (err, res) {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     }
    // }, 30000);

    test('display cart', (done) => {
        request(app)
            .get('/mycart/showall')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTEyN2U4MjU0NTBhMDIxOGNjZGM4NTMiLCJmaXJzdE5hbWUiOiJrdWt1IiwibGFzdE5hbWUiOiJodWh1IiwiZW1haWwiOiJrdWt1QGdtYWlsLmNvbSIsInBob25lIjoiOTgwMzcyMjIzMSIsImFkZHJlc3NCb29rIjp7InByb3ZpbmNlIjoiUHJvdmluY2UzIiwiZGlzdHJpY3QiOiJCaGFrdGFwdXIiLCJhZGRyZXNzIjoiTWFkaHlhcHVyIHRoaW1pIDAzIiwidG9sZSI6Ik1hZGh5YXB1ciIsInppcENvZGUiOiI0NDgwMCJ9LCJ1c2VyVHlwZSI6IlVzZXIiLCJpYXQiOjE2MzA5MzA2ODZ9.2Rq7_W2L3u_iDY5MquopBsvPDJ6vj1vETmVzxLT3yvE'
                , { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(200, done);
    });

    // test('shows one product using its id', (done) => {
    //     request(app)
    //         .get('/mycart/one/6134b5d89486fe4aaca8a739')
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /charset=utf-8/)
    //         .expect(200, done);
    // })
});

describe("delete from cart", () => {
    test("delete one item from cart using id", (done) => {
        request(app)
            .del('/delete/mycart/613607112cead71a84a79660')
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