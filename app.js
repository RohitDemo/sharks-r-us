const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + '/views/';
const port = 8080;

var RateLimit = require('express-rate-limit');	
var limiter = new RateLimit({	
  windowMs: 1*60*1000, // 1 minute	
  max: 5	
});	

// apply rate limiter to all requests	
app.use(limiter);

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

router.get('/sharks', function(req,res){
  res.sendFile(path + 'sharks.html');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})
