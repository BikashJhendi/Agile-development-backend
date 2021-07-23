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
    it('insert new gadget product', function (done) {
        request(app)
            .post('/gadget/insert')
            .field({ gadgetname: 'Dell inspiron 6', gadgetprice: '20,000', gadgettype: 'Laptop', gadgetdescription: 'Dell dell dell' })
            .attach('gadgetimage', 'assets/image/gadget/1626618350751Venngage _ Editor-1.jpg')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(201, { message: "Gadget Added" })
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    test('fails to insert if required field is not filled in', (done) => {
        request(app)
            .post('/gadget/insert')
            .send({ gadgetname: '', gadgetprice: '', gadgettype: 'Laptop', gadgetdescription: 'Dell dell dell', gadgetimage: 'dell.jpg' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
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
            .expect('Content-Type', /charset=utf-8/)
            .expect(200, done);
    });

    test('shows one product using its id', (done) => {
        request(app)
            .get('/gadget/one/60fad7d8e3d1a032a802fb85')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(200, done);
    })

    test('fails if product id does not exist', (done) => {
        request(app)
            .get('/gadget/one/1234')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(500, done);
    })
});