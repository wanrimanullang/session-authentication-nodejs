require('dotenv').config()
require('dotenv').config()
const express = require('express')
const { MemoryStore } = require('express-session')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 8000
const userDAO = require('./dao/user')
const redis = require('redis')
const redisClient = require('./db/redis')
const RedisStore = require('connect-redis')(session)

const sessionStorage = new MemoryStore()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

//session middleware    
app.use(session({
    name:'admin',
    secret:process.env.SESSION_SECRET,
    store: new RedisStore({ client: redisClient}),
    saveUninitialized:false,
    resave:false,
    rolling:true,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge: 1000*60
    }
}))

//end point mengakses dan memodifasi session
app.get('/session', (req,res) => {
    req.session.lastmodified = new Date()
    res.end
})

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/login', (req, res) => {
    res.render('pages/login')
})

app.get('/signup', (req, res) => {
    res.render('pages/signup')
})

app.get('/product', (req, res) => {
    res.render('pages/product')
})

app.listen(PORT, async () => {
    try{
        await userDAO.createUserTable()
        console.log(`Listen to PORT ${PORT}`)
    }
    catch(error){
        console.error(error)
    }
})