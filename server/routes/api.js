const express = require ('express')
const jwt = require ('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const { reset } = require('nodemon')
const User = require('../models/user')
const db = "mongodb+srv://sabbirAhmed:sabbirAhmedpassword@cluster0.ffw11.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true },err => {
    if(err){
        console.error('error!'+ err)
    }else{
        console.log('connected to mongodb api')
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token =req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,'123')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
}

router.get('/',(req,res)=>{

    res.send('from API route')
})
router.get('/register',(req,res)=>{
    res.send('u r in register page')
})
router.get('/login',(req,res)=>{
    res.send('u r in log in page')
})
router.get('/home',(req,res)=>{
    res.send('u r in Home page')
})
router.get('/write',(req,res)=>{
    res.send('u r in write page')
})
router.get('/member',verifyToken,(req,res)=>{
    res.send('u r in member page')
})

router.post("/register", (req, res) => {
    var user = new User(req.body);
    user.save()
      .then(registeredUser => {
          let payload ={subject : registeredUser._id}
          let token =jwt.sign(payload,'secret key')
          res.status(200).send({token})
      })
      .catch(err => {
        res.status(400).send(err);
      });
});

router.post("/login",(req,res)=>{
    
    let userData = req.body ;
    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('invalid email')
            }else
            if(user.password !== userData.password)
            {
                res.status(401).send('invalid password')
            }
            else{
                let payload = {subject : user._id};
                let token = jwt.sign(payload,'123');

                let sendUser = {
                    _id: user._id,
                    email: user.email
                };

                res.status(200).send({token, user: sendUser});
            }
        }
    })
})
module.exports = router