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
        // .then((pro_ret) => {
        //     expect(pro_ret.email).toEqual('bikash@123.com');
        //  });
     });

     it('find user using id', () => {
        return users.findOne({_id:Object('60ed73f0ec08c60210d1e95a')})
     });

     it('user logins using valid email address',()=>{
        return users.findById('60ed73f0ec08c60210d1e95a')
        .then((u)=>{
            expect('Bikash@123.com').toEqual(u.email);
            expect('1234').toEqual(u.password);
        })
     })

})
