/**
 * Created by bernat on 6/03/16.
 */

    //Configuración del servidor y las rutas

//Librerías que necesitamos
var express     = require('express');
var app         = express();
var mongoose     = require('mongoose');
var path = require('path');
var http = require('http');

// Conexión con la base de datos
mongoose.connect('mongodb://localhost/angular-todo');

// Configuración

app.set('port',process.env.PORT || 3000); //Ponemos a escuchar en el puerto 3000
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public'))); //Localización de los ficheros estáticos
app.use(express.logger('dev')); //Muestra log de los request


// Definición de modelo
var Todo = mongoose.model('Todo', {
    text: String
});


// Rutas de nuestro API
// GET de todos los TODOs
app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if(err) {
            res.send(err);
        }
        res.json(todos);
    });
});
// POST que crea un TODO y devuelve todos tras la creación
    app.post('/api/todos', function (req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err) {
                res.send(err);
            }

            Todo.find(function (err, todos) {
                if (err) {
                    res.send(err);
                }
                res.json(todos);
            });
        });
    });

// DELETE un TODO específico y devuelve todos tras borrarlo.
    app.delete('/api/todos/:todo', function (req, res) {
        Todo.remove({
            _id: req.params.todo
        }, function (err, todo) {
            if (err) {
                res.send(err);
            }

            Todo.find(function (err, todos) {
                if (err) {
                    res.send(err);
                }
                res.json(todos);
            });

        })
    });

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });


//Creamos e iniciamos el servidor
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
