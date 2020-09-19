var express = require ("express");
var bodyParser = require("body-parser");
var http = require("http");
var fs = require("fs");

//import customer module
var stack = require("./scripts1/myStack")

//set s to new instance of myStack
var s = new stack.myStack();

//use express
var app = express();

//use body parser
app.use(bodyParser.urlencoded({extended:true}));

//set the file folders
app.use(express.static("views"));
app.use(express.static("scripts"));
app.use(express.static("images"));

//set the view engine
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//create and provide the server port for the app
app.listen(8080, function(){
	console.log("Server is running correctly");
});

//initialize an empty array for results
var results = [];

//main route, all posts redirect here
app.get('/', function(req,res){
    //if results is empty, which it should be at start
    //or if all items are deleted
    //then print message, else, print the results
    if(results == ""){
        results = "Simple Stack Data Structre, add items to see"
        res.render("index",{results});
    }else{
        res.render("index",{results});
    }
    
});

app.post('/stack', async(req,res)=>{
    //get the user input
    var input = req.body.element

    //check if its only a letter or number
    var reg1 = new RegExp("^[A-Za-z0-9]+$");
    var result1 = reg1.test(input)
    
    //if its only a letter or number the push onto stack
    //and give a message to say what it was
    //else give warning message
    if(result1 === false){
        results = "Only letters and numbers allowed"
        res.redirect('/');
    }else{
        s.push(input);
        results = "'" + s.peek() +"' added to the stack"
        res.redirect('/');
    }
});

app.post('/stackPrint', async(req,res)=>{
    //set results to the current stack
    results = s.printStack();

    //if the stack length is greater the 0 
    //give results or else give warning msg
    if(results.length > 0){
        results = "The Stack contains: " + s.printStack();
        res.redirect('/');
    }else{
        results="Eh, stack is empty, add something first"
        res.redirect('/');
    } 
});

app.post('/stackLast', async(req,res)=>{
    //set results to the current stack
    results = s.printStack();

    //if the stack length is greater the 0 
    //give results or else give warning msg
    if(results.length > 0){
        results = "Last item in stack is: "+s.peek();
        res.redirect('/');
    }else{
        results="Nothing in the stack to see!"
        res.redirect('/');
    } 
});

app.post('/stackRemove', async(req,res)=>{
    //set results to the current stack
    results = s.printStack();

    //if the stack length is greater the 0 
    //give results or else give warning msg
    if(results.length > 0){
        results = "'" + s.peek() + "' removed from the stack"
        s.pop();
        res.redirect('/');
    }else{
        results="Nothing in the stack to see!"
        res.redirect('/');
    } 
});

app.post('/stackDelete', async(req,res)=>{
    //set results to the current stack
    results = s.printStack();

    //if the stack length is greater the 0 
    //delete the stack or else give warning msg
    if(results.length > 0){
        results = s.deleteStack();
        res.redirect('/');
    }else{
        results="Oops, Stack is already empty!"
        res.redirect('/');
    } 
});
