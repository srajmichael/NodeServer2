


const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT ||3000; //creates a port variable for heroku or it reverts to port 3000

var app= express();

hbs.registerPartials(__dirname+'/views/partials'); //allows you to use partials, similar to how express allows you to use hbs below
app.set('view engine', 'hbs');
//***express requires a directory called views located in the main directory to use hbs, in this case the main directory in nodeServer*****




app.use(express.static(__dirname+'/public')); //since server is running from nodeServer directory, __dirname is nodeServer then /public creates the path from nodeServer
//express.static is middleware where is this case __dirname represents port localhost:3000, its almost like 3000 and nodeServer are the same
//allows you to create a direct path to help.html and any other files in the public directory

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    if(err){console.log('Unable to append to server.log');}
  });
  next();
});

hbs.registerHelper('getCurrentYear',()=>{  //registerHelper allows you to use the same this on every page that uses it without having to render it in every page
  return new Date().getFullYear();
});

app.get('/',(req,res)=>{
  res.render('index.hbs',{
    pageTitle:'Home Page',
    bodyText:'I\'m really doing it!'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});


app.get('/derp/morederp',(req,res)=>{
  res.send('<h1>DERP DERP</h1>');
});


app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
