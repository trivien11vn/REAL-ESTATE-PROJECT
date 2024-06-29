const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt');


const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
const listingTypes = ['SALE', 'RENTAL']

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
    }, {
        userId: 7,
        roleCode: '2', //Owner
        createdAt: new Date(),
        updatedAt: new Date()
    },],
    property_types: [
        {
            name: 'House',
            image: faker.image.urlLoremFlickr({
                width: 1000,
                height: 500,
                category: 'house'
            }),
            description: faker.lorem.sentences({ min: 2, max: 3 }),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Apartment',
            image: faker.image.urlLoremFlickr({
                width: 1000,
                height: 500,
                category: 'apartment'
            }),
            description: faker.lorem.sentences({ min: 2, max: 3 }),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Townhouse',
            image: faker.image.urlLoremFlickr({
                width: 1000,
                height: 500,
                category: 'townhouse'
            }),
            description: faker.lorem.sentences({ min: 2, max: 3 }),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    properties: Array.from([...Array(60).keys()]).map((el) => (
        {
            name: faker.lorem.sentences({ max: 1, min: 1}).replace('.', ''),
            description: faker.lorem.sentences({ min: 5, max: 10 }),
            listingType: faker.helpers.arrayElement(listingTypes),
            price: faker.number.int({ min: 1000, max: 100000 }),
            propertyTypeId: faker.number.int({ min: 1, max: 3 }),
            owner: faker.helpers.arrayElement([7, 9]),
            status: 'PENDING',
            isAvailable: true,
            featuredImage: faker.image.urlLoremFlickr({
                category: 'realestate'
            }),
            images: JSON.stringify( Array.from([...Array(faker.number.int({ min: 5, max: 6 })).keys()]).map(() => `${faker.image.urlLoremFlickr({ category: 'realestate' })}?random=${faker.string.numeric(30)}`)),
            postedBy: faker.helpers.arrayElement([7, 9, 8]),
            bedRoom: faker.number.int({ min: 1, max: 3}),
            bathRoom: faker.number.int({ min: 1, max: 3}),
            size: faker.number.int({ min: 20, max: 200}),
            yearBuilt: faker.number.int({ min: 1945, max: 2024}),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    )),
    features: [
        {
            name: 'Air Conditioning',
            image: faker.image.urlLoremFlickr({
                category: 'air conditioning'
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Furnance',
            image: faker.image.urlLoremFlickr({
                category: 'furnance'
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Pool',
            image: faker.image.urlLoremFlickr({
                category: 'pool'
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Garage',
            image: faker.image.urlLoremFlickr({
                category: 'garage'
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ],
    property_features: Array.from([...Array(60).keys()]).map((el) => ({
        propertyId: el + 1,
        featureId: faker.number.int({ min: 1, max: 4}),
        createdAt: new Date(),
        updatedAt: new Date()
    }))
}

