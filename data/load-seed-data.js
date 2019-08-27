const client = require('../lib/client');
const seedData = require('./seed-data');

client.connect()
    .then(() => {
        return Promise.all(
            seedData.map(item => {
                return client.query(`
                    INSERT INTO todo (item)
                    VALUES ($1)
                    RETURNING *;
                `,
                [item.item])
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