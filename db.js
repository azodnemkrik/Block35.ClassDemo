const pg = require('pg')
const client = new pg.Client('postgres://localhost/fav_products' || process.env.DATABASE_URL)
const {v4} = require('uuid')
const uuidv4 = v4
const bcrypt = require('bcrypt')


const createUser = async (user) => {
    if(!user.username.trim() || !user.password.trim()) {
        throw Error ('Must have a valid username and password.')        
    }
    user.password = await bcrypt.hash(user.password, 6)
    const SQL = `
        INSERT INTO users
        (id, username, password)
        VALUES
        ($1, $2, $3)
        RETURNING *
    `
    const response = await client.query(SQL , [uuidv4(), user.username, user.password ])
    return response.rows[0]
}

const createProduct = async (product) => {
    const SQL = `
        INSERT INTO products
        (id, name)
        VALUES
        ($1, $2)
        RETURNING *
    `
    const response = await client.query(SQL , [uuidv4(), product.name])
    return response.rows[0]
}

const seed = async () => {
    // CREATE TABLES
    const SQL = `
        DROP TABLE IF EXISTS favorites;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
        CREATE TABLE users(
            id UUID PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        );
        CREATE TABLE products(
            id UUID PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL
        );
        CREATE TABLE favorites(
            id UUID PRIMARY KEY,
            product_id UUID REFERENCES products(id) NOT NULL,
            user_id UUID REFERENCES users(id) NOT NULL,
            CONSTRAINT product_and_user_id UNIQUE(product_id, user_id)
        );
    `
    await client.query(SQL)
    console.log('Created tables and seeded data.')

    // ADD DATA
    const [motobycle, tanker, choplotz, shabangin] = await Promise.all([
        createProduct({name: 'Motobycle'}),
        createProduct({name: 'Tanker'}),
        createProduct({name: 'Choplotz'}),
        createProduct({name: 'Shabangin'}),
    ])

    const [kirk, kathy, mae] = await Promise.all([
        createUser({username: "Kirk", password:'222'}),
        createUser({username: "Kathy", password:'222'}),
        createUser({username: "Mae", password:'222'})
    ])

}

module.exports = {
    seed,
    client
}