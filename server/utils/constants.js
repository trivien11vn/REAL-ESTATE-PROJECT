const {faker} = require('@faker-js/faker')
const bcrypt = require('bcrypt');


const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
module.exports = {
    roles: [
        {
            code: '1',
            value: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            code: '2',
            value: 'Owner',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            code: '3',
            value: 'Agent',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            code: '4',
            value: 'User',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    users: Array.from([...Array(10).keys()]).map(() => ({
        name: faker.person.fullName(),
        phone: '0' + faker.string.numeric(9), //random 1 so co 9 chu so
        email: faker.internet.email({
            provider: 'gmail.com',
            allowSpecialCharacters: false
        }),
        address: faker.location.streetAddress({ useFullAddress: true }),
        password: hashPassword('123456'),
        avatar: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date()
    })),
    user_roles: [...Array.from([...Array(10).keys()]).map((el) => ({
        userId: el + 1,
        roleCode: '4',
        createdAt: new Date(),
        updatedAt: new Date()
    })), {
        userId: 8,
        roleCode: '3', //Agent
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        userId: 9,
        roleCode: '2', //Owner
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        userId: 10,
        roleCode: '1', //Admin
        createdAt: new Date(),
        updatedAt: new Date()
    }]
}

