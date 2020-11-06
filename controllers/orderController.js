// require

const express = require('express');
const mongoose= require('mongoose');
const Order= mongoose.model('Order');


var router = express.Router();
mongoose.set('useFindAndModify',false);

//Router
router.get('/',(req,res)=>{
    res.render('menu');

});
router.get('/cart',(req,res)=>{
    res.render('cart');

});
router.get('/orders',(req,res)=>{
    res.render('orders');

});
router.get('/admin',(req,res)=>{
    Order.find((err,docs)=>{
        if(!err){
            res.render('admin',{

                order:docs
            });
        }else {
            console.log('Error is order:'+err);
        }
    });
});


router.get('/order/:id',(req,res)=>{
    Order.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("orders",{order:doc});
        }else{
            console.log('Error findbyId:'+err)
        }
    });
});

router.get('/order/delete/:id',(req,res)=>{
    Order.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/admin');
        }else{
            console.log('Error in delete:'+err)
        }
    });
});



//POST
router.post('/cart',(req,res)=>{
    insertOrder(req,res);
});
router.post('/order',(req,res)=>{
    updateOrder(req,res);
});


//function
function updateOrder(req,res){
    order.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('/admin');
        }else{
            console.log('update error'+err);
        }
    });
}


function insertOrder(req,res){
    var d=new Date();
    var t=d.getTime();
    var counter=t;
    counter+=1;
    var order=new order();
    order.total=req.body.total;
    order.order=counter;
    order.save((err,doc)=>{
        if(!err){
            console.log('order:'+order);
            res.redirect('/admin');
        }else{
            console.log('Error inserOrder:'+err)
        }
    });
}

module.exports=router;


