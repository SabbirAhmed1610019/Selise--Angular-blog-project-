const express = require ('express')
const bodyParser = require ('body-parser')
const cors = require ('cors')

const port = 3000

const api =require('./routes/api')
const blog = require('./routes/blogRoute')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

app.use('/api',api)
app.use('/blog',blog)

app.get('/',function (req , res) { 
    res.send('Hello from server')
})

app.listen(port,function(co) {
    console.log('server running on localhost'+ port)
})