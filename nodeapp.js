const express = require('express');
const ejs = require('ejs');
const body_parser = require('body-parser');
const dotenv = require('dotenv').config({ path: './Private.env' }); //ELES YOU CAN ALSO USE SIMPLE .CONFIG() BUT IN THAT CASE RENAME THE FILE TO JUST .ENV
const mongoose = require('mongoose');

//==================================================Declaring-body==========================================
const Port = process.env.PORT || 3000;
const MongoConnect = process.env.MONGOCONNECT;
//Initiliazed express
const app = express();
//EJS
app.set('view engine', 'ejs');
//Body parser 
app.use(body_parser.urlencoded({extended:false})) 

//=========================DATA============================
const DATA = [{
    id:'1',
    uname:'Asshutosh',
    fname:'Sharma',
    age:'14',
}, 
{
    id:'2',
    uname:'Raman',
    fname:'Sharma',
    age:'44',
},
{
    id:'3',
    uname:'Deepak',
    fname:'Sharma',
    age:'24',
}]
//Mongoose Schema 
const Users = mongoose.model('Book',{
    firstname:String,
    lastname:String,
    phone:Number,
})
//=========================FUNCTIONS=============================



//FETCH DATA FROM THE DB
app.get('/api/all', async (req,res) =>{
    try{
        let data =  await Users.find({})
        res.json({
            message:`Data Found For Database`,
            Data:[{
                data
            }]
        })
    }catch(error){
        res.json({
            message:`Cannot Fetch Data! Error: ${error}`
        })
    }
})
//POST DATA FROM THE DB
app.post('/api' , async (req,res) =>{
    const {fname,lname,phone} = req.body;
    try{
        await Users.create({firstname:fname,lastname:lname,phone}) //The query u been looking for the whole time in the video
    }catch(error){
        res.json({message:"somthing went wrong!",
        Error:`${error}`    
    })
    }
    res.json({
        message:"Logged In Successfully",
        User_Data:[{Name:fname,Last_name:lname,Phone_Number:phone}]
    })
})
//DELETE THE DATA FROM DB
app.post('/api/delete' , async (req,res) =>{
    const {phone} = req.body;
    console.log(phone)
    try {
        // Use deleteOne to delete the record based on the provided phone number
        const result = await Users.deleteOne({ phone });

        // Check if the record was found and deleted
        if (result.deletedCount > 0) {
            res.json({
                message: `Successfully deleted record with phone number ${phone}`,
            });
        } else {
            res.json({
                message: `Record with phone number ${phone} not found`,
            });
        }
    } catch (error) {
        res.json({
            message: `Error deleting record: ${error}`,
        });
    }
})

//TEST THE JSON DATA
app.get('/a',(req,res) =>{
    const Data1 = DATA.find(Data=>Data.id === '2')
    res.render('new' , {Data:Data1 , Meta:DATA})
  
})

app.get('/', async (req, res) => {
    try {
        // Fetching all data from the Users collection
        const data = await Users.find({});
        
        // Rendering the dynamic.ejs template with the fetched data
        res.render('dynamic', { D: data });
    } catch (error) {
        res.json({
            message: `Cannot Fetch Data! Error: ${error}`
        });
    }
});
//===============================================================
app.get('*', (req,res) => { 
    res.send("Bad Req Man!!")
})

app.listen(Port , '0.0.0.0', ()=>{
    //DB CONNECTION+++++++++++++++++++++++++++++++>>>>>
    const DB = mongoose
    .connect(MongoConnect, {
      dbName: 'Test', // Specify your database name here
    })
    .then(()=>console.log("Successfull login!!"))
    .catch(error=>console.log("Failed to login!!",error))

    console.log("Port is =>"+ Port)
    console.log("Server is Running Fine!")
})
//=========================FUNCTIONS=============================