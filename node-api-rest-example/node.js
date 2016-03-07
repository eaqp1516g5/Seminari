var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var router = express.Router();

var TVShowCtrl = require('./controllers/tvshows');

// API routes
var tvshows = express.Router();

tvshows.route('/tvshows')  
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')  
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);  


router.get('/', function(req, res) {  
   res.send("Hello World!");
});

app.use(router);

mongoose.connect('mongodb://localhost/tvshows');  

app.listen(3000, function() {  
  console.log("Node server running on http://localhost:3000");
});

