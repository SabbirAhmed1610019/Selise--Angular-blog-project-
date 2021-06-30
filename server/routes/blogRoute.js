const express = require ('express')
const jwt = require ('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const { reset } = require('nodemon')
const User = require('../models/user')
const Blog = require('../models/blog')
const db = "mongodb+srv://sabbirAhmed:sabbirAhmedpassword@cluster0.ffw11.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true },err => {
    if(err){
        console.error('error!'+ err)
    }else{
        console.log('connected to mongodb blog')
    }
})

router.get('/',(req,res)=>{

    res.send('from blog route')
})
router.get('/write',(req,res)=>{
    res.send('u r in write blog page')
})
router.get('/home',(req,res)=>{
    res.send('u r in blog home page')
})
router.get('/member',(req,res)=>{
    res.send('u r in blog member page')
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
    req.userId = payload.subject;
    next();
}

router.post('/write', verifyToken, async (req,res)=>{
    try {
        const userId = req.userId;
        const blogBody = req.body;
        const author= await User.findOne({_id: userId}).select("email");
        const newBlog = new Blog ({
            title: blogBody.title,
            text: blogBody.text,
            author: author.email
        })
        const savedBlog = await newBlog.save()
        res.send(savedBlog)
        
    } catch (err) {
        res.status(err.status || 500).send({
            status:err.status || 500,
            message: err.message
        })
    }
})

router.get('/allBlogs',async (req,res)=>{
    try {
        const allBlogs= await Blog.find()
        res.send(allBlogs)
        
    } catch (err) {
        res.status(err.status || 500).send({
            status:err.status || 500,
            message: err.message
        })
    }
})
router.get('/:blogId',async (req,res)=>{
    try {
        const blogId = req.params.blogId;
        const blog= await Blog.findOne({_id: blogId}).select("title text author")
        res.send(blog)
        
    } catch (err) {
        res.status(err.status || 500).send({
            status:err.status || 500,
            message: err.message
        })
    }
})
router.delete('/:blogId',async (req,res)=>{
     Blog.findByIdAndRemove(req.params.blogId,function(err,deletedBlog){
         if(err){
             res.send("Error deleting blog");
         }else{
             res.json(deletedBlog)
         }
     })
})
module.exports = router