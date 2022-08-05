//toys file for routes directory


const express = require('express');
const router = express.Router();
const toys = require('../services/toys');

//GET Toys 
router.get('/', async function(req,res,next){
	try{
		res.json(await toys.getMultiple(req.query.page));
	}catch(err){
		console.error('Error while getting toys', err.message);
		next(err);
	}
});

//POST Toys
router.post('/', async function(req,res,next){
	try{
		res.json(await toys.create(req.body));
	}catch(err){
		console.error(`Error while creating Toy`,err.message);
		next(err);
	}
});

//PUT Toys
router.put('/:id',async function(req,res,next){
	try{
		res.json(await toys.update(req.params.id,req.body));}
	catch(err){
		console.error(`Error while update Toy`,err.message);
		next(err);
	}
	
});

//DELETE Toys
router.delete('/:id',async function(req,res,next){
	try{
		res.json(await toys.remove(req.params.id));
	} catch(err){
		console.error(`Error while deleting toy`,err.message);
		next(err);
	}
	
});

module.exports = router;
