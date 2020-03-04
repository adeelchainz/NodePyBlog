//Init
const express= require('express');
const app= express();
const mongoose= require('mongoose');

//Connecting db
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://adeelchainz:Manamiz-123@nodeblog-kwwve.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true}).then(()=>console.log('Connected')).catch(err=>console.error(err));

//Routes, Simple Server
app.get('/', (req,res)=>{
    res.send('Hello!')
});


//Assigning Port, Standard 5000 for Node
app.listen(5000);
