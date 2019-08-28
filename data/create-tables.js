const client = require('../lib/client');

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE todo (
                id SERIAL PRIMARY KEY NOT NULL,
                item VARCHAR(256) NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT FALSE
            );
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(256) NOT NULL UNIQUE,
                hash VARCHAR(512) NOT NULL
            );
    `);
    })
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });