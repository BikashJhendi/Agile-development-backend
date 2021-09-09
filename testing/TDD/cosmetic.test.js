const cosmetic = require('../../models/cosmetic');
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

describe('Cosmetic product testing', () => {
    it('insert new cosmetic product', function (done) {
        request(app)
            .post('/cosmetic/insert')
            .field({
                cosmeticname: 'Watch', cosmeticprice: '20,000', cosmetictype: 'Perfume', cosmeticdescription: 'Millinium',
                cosmeticgender: 'Men', cosmeticmodel: 'scent'
            })
            .attach('cosmeticImages', 'assets/image/cosmetic/1629993345326bonfire.jpg')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    test('fails to insert if required field is not filled in', (done) => {
        request(app)
            .post('/cosmetic/insert')
            .send({ cosmeticname: 'watch', cosmeticprice: '', cosmetictype: '', cosmeticdescription: 'watch', cosmeticImages: 'watch' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    })

    test('shows all product', (done) => {
        request(app)
            .get('/cosmetic/showall')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(200, done);
    });

    test('shows one product using its id', (done) => {
        request(app)
            .get('/cosmetic/one/6134b5d89486fe4aaca8a739')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(200, done);
    })

    test('fails if product id does not exist', (done) => {
        request(app)
            .get('/cosmetic/one/1234')
            .set('Accept', 'application/json')
            .expect('Content-Type', /charset=utf-8/)
            .expect(500, done);
    })
});