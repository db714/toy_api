//toys file for connecting the route to the database


const db = require('./db');
const helper = require('../helper');
const config = require('../config');

//GET method
async function getMultiple(page=1){
	const offset = helper.getOffset(page,config.listPerPage);
	//get this to work first then modify
	const rows = await db.query(`SELECT id, name, brand, price, rank FROM Toys LIMIT ${offset}, ${config.listPerPage}`);
	const data = helper.emptyOrRows(rows);
	const meta = {page};

	return {
		data,meta
	}
}

//POST method
async function create(toys){
	const result = await db.query(
		`INSERT INTO Toys(id,name,brand,price,rank)VALUES(${toys.id},${toys.name},${toys.brand},${toys.price},${toys.rank}			)`
	);

	let message = 'Error in creating Toy';

	if(result.affectedRows){
		message = 'Toy created successfully';
	}

	return {message};
}

//PUT method
async function update(id,toys){
	console.log(id);
	const result = await db.query(`UPDATE Toys SET name="${toys.name}",brand="${toys.brand}",price=${toys.price},
		rank=${toys.rank} WHERE id=${id}`);

	let message = 'Error in updating Toy';

	if(result.affectedRows){
		message = 'Toy updated successfully';
	}

	return{message};
}

//DELETE method
async function remove(id){
	const result = await db.query(`DELETE FROM Toys WHERE id=${id}`);

	let message = 'Error in deleting toy';

	if(result.affectedRows){
		message = 'Toy deleted successfully';}

	return{message};
}

module.exports = {
	getMultiple,
	create,
	update,
	remove
}
