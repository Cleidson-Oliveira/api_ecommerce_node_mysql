require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const user = require("./routes/user");
const product = require("./routes/product");
const order = require("./routes/order");
const errorTreatment = require("./utils/error_treatment");

app.use(express.json());

app.get("/", (_, res) => {
	res.send("Hello World!!!");
});

app.use("/user", user);
app.use("/product", product);
app.use("/order", order);

app.use((error, req, res) => { 
	errorTreatment(error.message, res);
});

app.listen(port | 3000, () => {
	console.log(`Rodando o server em http://localhost:${ port }`);
});
