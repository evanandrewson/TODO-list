require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

client.connect();

const ensureAuth = require('./lib/ensure-auth');
const createAuthRoutes = require('./lib/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => {
            console.log(result.rows[0]);
            return result.rows[0];
        });
    },
    insertUser(user, hash) {
        console.log(user);
        return client.query(`
            INSERT into users (email, hash)
            VALUES ($1, $2)
            RETURNING id, email;
        `,
        [user.email, hash]
        ).then(result => {
            console.log(result.rows[0]);
            return result.rows[0];
        });
    }
});

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api', ensureAuth);

app.get('/api/todos', (req, res) => {
    client.query(`
        SELECT
            id,
            item,
            completed
        FROM todo
        ORDER BY item;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });    
});

app.post('/api/todos', (req, res) => {
    const todo = req.body;
    client.query(`
        INSERT INTO todo (item)
        VALUES ($1)
        RETURNING *;
    `,
    [todo.item]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.put('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = req.body;

    client.query(`
        UPDATE todo
        SET    item = $2,
               completed = $3
        WHERE  id = $1
        RETURNING *;
    `,
    [id, todo.item, todo.completed]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});


app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});