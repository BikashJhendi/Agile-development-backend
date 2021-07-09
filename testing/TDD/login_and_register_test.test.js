const users = require('../../models/users');
const mongoose = require('mongoose');

const url ='mongodb://127.0.0.1:27017/DropShipping';
beforeAll(async () =>{
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex : true
    });
});

afterAll(async () =>{
    await mongoose.connection.close();
});

describe('Registration and Login testing', () => {
    //the code below is for insert testing
     it('Add new user with its details', () => {
        const user = {
            'firstname':'Bikash',
            'lastname':'Kasula',
            'phone':'0000000000',
            'district':'Bhaktapur',
            'tole':'bkt',
            'email': 'bikash@123.com',
            'password': '1234',
            };

        return users.create(user)
        .then((pro_ret) => {
            expect(pro_ret.email).toEqual('bikash@123.com');
         });
     });

     it('Add new user with its details', () => {
        const user = {
            'email': 'bikash@123.com',
            'password': '1234',
            };

        return users.findOne(user)
        .then((pro_ret) => {
            expect (200);
         });
     });
})
