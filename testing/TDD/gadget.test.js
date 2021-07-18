const gadget = require('../../models/gadget');
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

describe('Gadget product testing', () => {
    it('inserts new product', function (done) {
        request(app)
            .post('/cosmetic/insert')
            .send({ cosmeticname: 'watch', cosmeticprice: '1200', cosmetictype: 'Men', cosmeticdescription: 'watch', cosmeticimage: 'watch' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    test('fails to insert if required field is not filled in', (done) => {
        request(app)
            .post('/gadget/insert')
            .send({ gadgetname: 'Dell inspiron', gadgetprice: '120000', gadgettype: 'Laptop', gadgetdescription: 'Dell dell dell', gadgetimage: 'dell.jpg' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    })

    test('shows all product', (done) => {
        request(app)
            .get('/gadget/showall')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    test('shows one product using its id', (done) => {
        request(app)
            .get('/gadget/one/60f42daccd075a4094c827de')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    test('fails if product id does not exist', (done) => {
        request(app)
            .get('/gadget/one/1234')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500, done);
    })
});