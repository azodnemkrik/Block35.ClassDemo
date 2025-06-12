const pg = require('pg')
const client = new pg.Client(process.env.DATABASSE_URL || 'postgres://localhost/fav_products')

const seed = () => {
    const SQL = `
        CREATE TABLE users(
            id UUID PRIMARY KEY,
            name VARCHAR(100),
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        );
        CREATE TABLE products(
            id UUID PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
        );
        CREATE TABLE favorites(
            id UUID PRIMARY KEY,
            product_id UUID REFERENCES products(id) NOT NULL,
            user_id UUID REFERENCES users(id) NOT NULL,
            CONSTRAINT product_and_user_id UNIQUE(product_id, user_id)
        )
    `
}