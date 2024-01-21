const bodyParser = require('body-parser');
const express = require('express')
const os = require('os');
const ejs = require("ejs");
const app = express()

//EJS Definition
app.set('view engine' , 'ejs');
console.log("Working...");
//User Data
const USERS =[ {
    id:'1',
    uName:'Ashutosh',
    lname:'Kumar',
    age:'25',
    money:'$600022',
    },
    {
    id:'2',
    uName:'Amit',
    lname:'Kumar',
    age:'45',
    money:'$60310022',
    },
    {
    id:'3',
    uName:'Sagar',
    lname:'Kumar',
    age:'35',
    money:'$603122',
    }]
//Root Api

//USERDATA FILTER JSON FILE ======================================>>>>
app.get('/', (req,res) => {
    res.json(USERS.filter (user=> user.age >= 35));
    res.json(USERS.find (user=> user.age = 35));
})
//ABOUT PAGE ======================================>>>> 
app.get('/about' , (req,res) =>{
     res.send("This is About Page!!");
})
//SEND FILE ======================================>>>>
app.get('/view', (req,res) =>{
    res.sendFile(__dirname  + "/View.html")
})
//SERVER INFO FILE ======================================>>>>
app.get('/server-info', (req, res) => {
    const serverInfo = {
      serverName: os.hostname(),
      uptime: process.uptime(),
      startTime: new Date(Date.now() - process.uptime() * 1000),
      currentTime: new Date(),
    };
  
    res.json(serverInfo);
  });
//MIDDLEWARE================================================>>
const middleware = (req,res,next) =>{
    console.log("Middleware Hit...");
    const r = req.body.uName;
    if(r === "nigga"){
    next();
    }
}
//POST REQUEST FILE ======================================>>>>
 app.use(bodyParser.urlencoded({extended:false}))
 app.post('/valchecker' , middleware,(req,res)=> {
    const m = req.body;
    res.send(m.uName + m.Email)
    res.send(__dirname + "/about.html")   //Sendfile? 
    console.log(m)
})
//DYNAMIC PAGES AND ROUTES REQUEST FILE ======================================>>>>
app.get('/:var' , (req,res) =>{
console.log(req.params.var)
const D = USERS.find(user=>user.uName === req.params.var);
console.log(D)
res.render('dynamic', D);
});

//SERVER STATUS FILE ======================================>>>>
app.listen('3000', () => {
    console.log("App is Listening to 3000 port ...")
})

/* 
const DATA = {fname:'Ash',lname:'M',Age:'21'} */