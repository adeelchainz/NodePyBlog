//Init
const express= require('express');
const app= express();
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');

//Imports
const {User}= require('./model/user');
const config= require('./config/key'); 

//Connecting db
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.mongoURI,
    {useNewUrlParser: true}).then(()=>console.log('Connected')).catch(err=>console.error(err));

//Routes, Simple Server
app.get('/', (req,res)=>{
    res.send('Hello! Adeel')
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
app.post('/api/user/register', (req,res)=> {
    const user= new User(req.body)
    user.save((err,userData)=> {
        if(err) return res.json({success: false, err})
    })
    return res.status(200).json({
        success: true
    })
})


//Assigning Port, Standard 5000 for Node
app.listen(5000);
