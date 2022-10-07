require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT;

const user = require('./routes/user');
const product = require('./routes/product');
const order = require('./routes/order');
const { clientErrorMessages, orderErrorMessages, productErrorMessages, generalErrorMessages } = require('./utils/error_messages');

app.use(express.json());
app.use('/user', user);
app.use('/product', product);
app.use('/order', order);
app.use((error, req, res, next) => {
    switch (error.message) {
        case clientErrorMessages.notfound:
        case productErrorMessages.notfound:
        case orderErrorMessages.notfound:
            res.status(404).json({"error": error.message});
        break;

        case generalErrorMessages.invalidIdType:
        case generalErrorMessages.invalidIdValue:
        case clientErrorMessages.cpfAlreadyExists:
        case orderErrorMessages.invalidClientIdOrProductId:
            res.status(400).json({"error": error.message});
        break;
      
        default:
            res.status(500).json({"error": error.message});
        break;
      }
})

app.listen(port | 3000, () => {
    console.log(`Rodando o server em http://localhost:${port ? port : 3000}`)
});
