const router = require("express").Router();

const { handlerProducts } = require("../services/db");
const verifyId = require("../utils/verifyId");

router.post("/", async (req, res, next) => {
	try {
		const newProduct = await handlerProducts.create(req.body);
		res.status(201).json(newProduct);

	} catch (err) {
		next(err);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const products = await handlerProducts.get();
    
		res.status(200).json(products);

	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		verifyId(req.params.id);

		const products = await handlerProducts.get(req.params.id);

		res.status(200).json(products);

	} catch (err) {
		next(err);
	}

});

router.put("/:id", async (req, res, next) => {
	try {
		verifyId(req.params.id);

		const updatedProduct = await handlerProducts.update(req.body, parseInt(req.params.id));

		res.json(updatedProduct);

	} catch (err) {
		next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		verifyId(req.params.id);

		const deletedProduct = await handlerProducts.delete(req.params.id);

		res.json(deletedProduct);

	} catch (err) {
		next(err);
	}
});

module.exports = router;