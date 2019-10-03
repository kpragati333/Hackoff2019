const path=require('path')
var express =require('express')
var bodyParser=require("body-parser"); 
const hbs=require('hbs')
var multer = require('multer')
var upload = multer({ dest: 'public/uploads/' })

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://127.0.0.1:27017/hackoff'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
})

const app =express()
const port = process.env.PORT|| 5000



const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
}));

app.get('',(req,res)=>
{
    res.render('',{})
})
app.get('/index',(req,res)=>
{
    res.render('index',{})
})
app.get('/signup_success',(req,res)=>
{
    res.render('signup_success',{})
})
app.post('/sign_up', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var number = req.body.number; 
    const flag =0;
  
    var data = { 
        "name": name, 
        "email":email, 
        "number":number,
        "flag":0
    } 
db.collection('signup').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('/signup_success'); 
})

app.post('/info', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var message = req.body.message;
  
    var data = { 
        "name": name, 
        "email":email, 
        "message":message,
    } 
db.collection('info').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('/signup_success'); 
})


app.listen(port,() => {

    console.log('server is up on port '+ port)
})