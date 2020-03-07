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
/* app.get('/', (req,res)=>{
    res.send('Hello! Adeel')
}); */

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
app.get("/api/user/auth", (req,res) =>{ //Authenticated

})



app.post('/api/user/register', (req,res)=> {
        const user= new User(req.body);

        user.save((err,doc)=> {
        if(err) return res.json({success: false, err});
        res.status(200).json({
                success: true,
                userData: doc
        })
    })
})

app.post('/api/user/login', (req,res)=> {
    //Search email in DB
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user)
        return res.json({
            loginSuccess: false,
            message: "Auth Failed, email not found!"
        })
    //Compare Password
    user.comparePassword(req.body.password, (err, isMatch)=>{
        if(!isMatch){
            return res.json({loginSuccess: false, message:"Wrong Password!"})
        }
    })

    //genrateToken
    user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);
        res.cookie("x_auth", user.token)
            .status(200)
            .json({
                loginSuccess: true
            })
    })




    })

    
})



//Assigning Port, Standard 5000 for Node
app.listen(5000);
