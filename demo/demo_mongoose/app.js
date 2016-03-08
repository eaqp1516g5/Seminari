var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Schema = mongoose.Schema; 

mongoose.connect("mongodb://localhost/eamola");

//Definimos el Schema
var userSchemaJSON = {
	nombre:String,
	descripcion:String,
	edad: Number
};

//le pasamos el JSON, la clase Schema (viene de mongoose) crea un nuevo objeto que mongoose entiende y pasa a ser la estructura de nuestros datos
var user_schema = new Schema(userSchemaJSON);
//El modelo es User, el grupo de registros que se guardan en mongoDB es "User", le pasamos user_schema.	
var User = mongoose.model("User", user_schema);


var app = express();

app.use("/public",express.static('public'));
app.use(bodyParser.json()); //le decimos a express que utilizamos body parser para parsear los parametros que vengan en una peticion POST
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "jade");



//demostración 1

app.get("/",function(req,res){
	var user = new User({
		nombre: "Demo 1", 
		descripcion: "Estad atentos", 
		edad: "45"
	});
//la manera de distinguir un documento que este o no en la DB, es por el atributo _id
//cuando mongoose ejectura el metodo save y el objeto se guarda en mongoDB se le asigna una id
//para guardar un objeto se necesita un modelo
	user.save(function(){
	console.log(user);
	res.send("Datos demo 1 ok")

	});


});



//consulta a la base de datos


app.get("/formulario",function(req,res){
//callback primero recibimos error en caso que haya, segundo parametro documentos encontrados 
User.find(function(err,doc){
	console.log(doc);
	res.render("formulario");
});

	
});

//demostración 2

app.post("/formulario",function(req,res){
	var user = new User({
		nombre: req.body.nombre, 
		descripcion: req.body.descripcion,
		edad: req.body.edad		
	});

	user.save(function(){
		console.log(user);
		res.send("Datos demo 2 recibidos");
	});
});

app.listen(8080);