const client = require('../lib/client');
const seedData = require('./seed-data');
const fakeUser = require('./fake-user');

client.connect()
    .then(() => {
        return Promise.all(
            fakeUser.map(item => {
                return client.query(`
                    INSERT INTO users (email, hash)
                    VALUES ($1, $2)
                    RETURNING *;
                `,
                [item.email, item.hash])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(() => {
        return Promise.all(
            seedData.map(item => {
                return client.query(`
                    INSERT INTO todo (item, user_id)
                    VALUES ($1, $2)
                    RETURNING *;
                `,
                [item.item, 1])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });