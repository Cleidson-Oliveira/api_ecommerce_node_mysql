function conectar(){
    const mysql = require('mysql2/promise');

    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

    return connection;
}

// CRUD USER

const createUser = async (data) => {
    const con = await conectar();

    const sql = "INSERT INTO clients ( name_client, cpf_client, gender_client, birth_date_client, address_client ) VALUES ( ?, ?, ?, ?, ? )";
    const values = [data.name, data.cpf, data.gender, data.birthDate, data.address];

    const [ UserCreatedData ] = await con.query(sql, values);

    return { UserCreatedData, user: data};
}

const getUsers = async (id = null) => {
    const con = await conectar();

    const sql = !id ? "SELECT * FROM clients" : "SELECT * FROM clients WHERE id_client = ?";

    let [ userData ] = await con.query(sql, [id]);
    
    return userData;
}

const updateUser = async (data) => {
    const con = await conectar();

    const sql = `UPDATE clients SET name_client=?, cpf_client=?, gender_client=?, birth_date_client=?, address_client=? WHERE id_client = ?`;
    const values = [data.name, data.cpf, data.gender, data.birthDate, data.address, data.id];

    const [ userUpdatedData ] = await con.query(sql, values);

    return { userUpdatedData, user: data};
}

const deleteUser = async (id) => {
    const con = await conectar();

    const sql = `DELETE FROM clients WHERE id_client = ${id}`;

    const [ deletedUser ] = await con.query(sql);

    return deletedUser;
}

// CRUD PRODUCTS

const createProduct = async (data) => {
    const con = await conectar();
    
    const sql = "INSERT INTO products ( name_product, desc_product, price_cents_product, stock_product ) VALUES ( ?, ?, ?, ? )";
    const values = [data.name, data.desc, data.price, data.stock];

    const [ productCreatedData ] = await con.query(sql, values);

    return { productCreatedData, product: data};
}

const getProducts = async (id = null) => {
    const con = await conectar();

    const sql = !id ? "SELECT * FROM products" : "SELECT * FROM products WHERE id_product = ?";

    let [ productData ] = await con.query(sql, [id]);
    
    return productData;
}

const updateProduct = async (data) => {
    const con = await conectar();

    const sql = `UPDATE products SET name_product=?, desc_product=?, price_cents_product=?, stock_product=? WHERE id_product = ?`;
    const values =  [data.name, data.desc, data.price, data.stock, data.id];

    const [ productUpdatedData ] = await con.query(sql, values);

    return { productUpdatedData, product: data};
}

const deleteProduct = async (id) => {
    const con = await conectar();

    const sql = `DELETE FROM products WHERE id_product = ${id}`;

    const [ productDeleted ] = await con.query(sql);

    return productDeleted;
}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}