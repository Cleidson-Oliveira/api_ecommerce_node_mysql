const express = require('express');
const { 
    getUsers, 
    createUser, 
    deleteUser, 
    updateUser, 
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require('./services/db');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/user', async (req, res) => {
    const id = parseInt(req.query.id);

    const users = await getUsers(id);
    res.status(200).json(users);
})

app.get('/products', async (req, res) => {
    const id = parseInt(req.query.id);

    const products = await getProducts(id);
    res.status(200).json(products);
})

app.post('/user', async (req, res) => {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
})

app.post('/products', async (req, res) => {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
})

app.put('/user', async (req, res) => {
    const updatedUser = await updateUser(req.body);
    res.json(updatedUser);
})

app.put('/products', async (req, res) => {
    const updatedProduct = await updateProduct(req.body);
    res.json(updatedProduct);
})

app.delete('/user', async (req, res) => {
    const id = parseInt(req.query.id);

    const deletedUser = await deleteUser(id);
    res.json(deletedUser);
})

app.delete('/products', async (req, res) => {
    const id = parseInt(req.query.id);

    const deletedProduct = await deleteProduct(id);
    res.json(deletedProduct);
})

app.listen(port | 3000, () => {
    console.log("ronando o server em http://localhost:3000");
})


