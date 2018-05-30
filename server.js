
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var config = require("./config");
var mongoose = require("mongoose");
var app = express();

mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("connected to db");
	}
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app,express);
app.use('/api',api);

app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/view/index.html');
});

app.listen(config.port, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("listenig on port 3000");
	}
});

/*for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1;
}
for(i=1;i<100;i++)
console.log('Number ' + i + ' ' + isPrime(i));

while(no>0)
{
a=no%10;
no=parseInt(no/10);
temp=temp*10+a;
}*/

//Palindrome
document.querySelector(".btn").addEventListener("click", function(){
    var strg = document.querySelector(".screen").value;
    var pal = strg.split("").reverse("").join("");
    if (strg == pal) {
        console.log(strg+" is a palindrome");
    }
    else {
        console.log(strg+" is not a palindrome");
    }
});

//Prime

for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1;
}
for(i=1;i<100;i++)
console.log('Number ' + i + ' ' + isPrime(i));

//
var i;
var fib = []; // Initialize array!

fib[0] = 0;
fib[1] = 1;
for(i=2; i<=10; i++)
{
    // Next fibonacci number = previous + one before previous
    // Translated to JavaScript:
    fib[i] = fib[i-2] + fib[i-1];
    console.log(fib[i]);
}

var recursive = function(n) {
    if(n <= 2) {
        return 1;
    } else {
        console.log( this.recursive(n - 1) + this.recursive(n - 2));
    }
};