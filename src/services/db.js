const { orderErrorMessages, clientErrorMessages, productErrorMessages } = require("../utils/error_messages");

const conectar = () => {
	const mysql = require("mysql2/promise");

	const connection = mysql.createConnection({
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE
	});

	return connection;
};

const handlerUsers = {
	create: async (data) => {
		const con = await conectar();

		const sql = "INSERT INTO clients ( name_client, cpf_client, gender_client, birth_date_client, address_client ) VALUES ( ?, ?, ?, ?, ? )";
		const values = [data.name, data.cpf, data.gender, data.birthDate, data.address];

		try {
			const [ UserCreatedData ] = await con.query(sql, values);

			return { UserCreatedData, user: data};
		} catch (err) {
			if (err.errno == 1062) {
				throw new Error(clientErrorMessages.cpfAlreadyExists);
			}
		}
	},
	get: async (id = null) => {
		const con = await conectar();

		const sql = !id ? "SELECT * FROM clients" : "SELECT * FROM clients WHERE id_client = ?";

		let [ userData ] = await con.query(sql, [id]);

		if (userData.length === 0) {
			throw new Error(clientErrorMessages.notfound);
		}
        
		return userData;
	},
	update: async (data, id) => {
		const con = await conectar();

		const sql = "UPDATE clients SET name_client=?, cpf_client=?, gender_client=?, birth_date_client=?, address_client=? WHERE id_client = ?";
		const values = [data.name, data.cpf, data.gender, data.birthDate, data.address, id];

		const [ userUpdatedData ] = await con.query(sql, values);

		if (userUpdatedData.affectedRows === 0) {
			throw new Error(clientErrorMessages.notfound);
		}

		return { userUpdatedData, user: data};
	},
	delete: async (id) => {
		const con = await conectar();

		const sql = "DELETE FROM clients WHERE id_client = (?)";

		const [ deletedUser ] = await con.query(sql, [id]);

		if (deletedUser.affectedRows === 0) {
			throw new Error(clientErrorMessages.notfound);
		}

		return deletedUser;
	}
};

const handlerProducts = {
	create: async (data) => {
		const con = await conectar();
        
		const sql = "INSERT INTO products ( name_product, desc_product, images_product, price_cents_product, stock_product ) VALUES ( ?, ?, ?, ?, ? )";
		const values = [data.name, data.desc, data.image, data.price, data.stock];
    
		const [ productCreatedData ] = await con.query(sql, values);
    
		return { productCreatedData, product: data};
	},
	get: async (id = null) => {
		const con = await conectar();
    
		const sql = !id ? "SELECT * FROM products" : "SELECT * FROM products WHERE id_product = ?";
    
		let [ productData ] = await con.query(sql, [id]);

		if (productData.length === 0 && id !== null) {
			throw new Error(productErrorMessages.notfound);
		}
        
		return productData;
	},
	update: async (data, id) => {
		const con = await conectar();
    
		const sql = "UPDATE products SET name_product=?, desc_product=?, price_cents_product=?, stock_product=? WHERE id_product = ?";
		const values =  [data.name, data.desc, data.price, data.stock, id];
    
		const [ productUpdatedData ] = await con.query(sql, values);

		if (productUpdatedData.affectedRows === 0) {
			throw new Error(productErrorMessages.notfound);
		}
    
		return { productUpdatedData, product: data};
	},
	delete: async (id) => {
		const con = await conectar();
    
		const sql = "DELETE FROM products WHERE id_product = (?)";
    
		const [ productDeleted ] = await con.query(sql, [id]);
        
		if (productDeleted.affectedRows === 0) {
			throw new Error(productErrorMessages.notfound);
		}
    
		return productDeleted;
	}
};

const handlerOrders = {
	create: async (data) => {
		const con = await conectar();
        
		const sql = "INSERT INTO orders ( client, product ) VALUES ( ?, ? )";
		const values = [data.client, data.product];
    
		try {
			const [ orderData ] = await con.query(sql, values);
    
			return { orderData, order: data};
		} catch (err) {
			if (err.errno == 1451 | err.errno == 1452) {
				throw new Error( orderErrorMessages.invalidClientIdOrProductId);
			}
		}
	},
	get: async (id = null) => {
		const con = await conectar();
    
		const sql = !id ? "SELECT * FROM orders" : "SELECT * FROM orders WHERE id_order = ?";
    
		let [ orderData ] = await con.query(sql, [id]);

		if (orderData.length === 0 && id !== null) {
			throw new Error(orderErrorMessages.notfound);
		}
        
		return orderData;
	},
	update: async (data, id) => {
		const con = await conectar();
    
		const sql = "UPDATE orders SET client=?, product=? WHERE id_order = ?";
		const values =  [data.client, data.product, id];
    
		const [ orderUpdated ] = await con.query(sql, values);

		if (orderUpdated.affectedRows === 0) {
			throw new Error(orderErrorMessages.notfound);
		}
    
		return { orderUpdated, order: data};
	},
	delete: async (id) => {
		const con = await conectar();
    
		const sql = "DELETE FROM orders WHERE id_order = ?";
    
		const [ orderDeleted ] = await con.query(sql, [id]);

		if (orderDeleted.affectedRows === 0) {
			throw new Error(orderErrorMessages.notfound);
		}
    
		return orderDeleted;
	}

};

module.exports = {
	handlerUsers,
	handlerProducts,
	handlerOrders
};