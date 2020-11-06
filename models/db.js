const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/lovelyfoodhouse',{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log('MongoDB Connected')

    }
    else{
        console.log('erroe:'+err);
    }
});

require('./order.model');