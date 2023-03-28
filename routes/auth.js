const express = require('express')
const router = express.Router()
const User = require("../models/User")
//const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

let refreshTokens = [];

router.get("/",authenticateToken, async (req,res)=>{
    
    try{
        console.log(req.user,"user");
        let user = await User.findOne({email: req.user.email})
        res.json(user)
        
    }catch(error){
        res.status(500).json({err:error})
    }
})

router.get("/userall",async (req,res)=>{
    try{
        let usersAll = await User.find({})
        res.json({usersAll})
        
    }catch(error){
        res.status(500).json({err:error})
    }
})

router.post("/register",async (req,res)=>{
    try{
        const {username,email,password} = req.body
        console.log(password)
        //const HashPassword = await bcrypt.hash(password,10)
        let newUser = await new User({
            username,
            email,
            password

        })
        await newUser.save()
           res.status(201).json({newUser})
        } 
    catch(error){
        console.log(error)
         res.status(500).json({err:error})
    }  
 })
 router.post("/login",async (req,res)=>{
    try{
        const email = await User.findOne({email:req.body.email})
        console.log(email)
        if(!email) return res.status(404).json("user not found");
        if(email.password === req.body.password){
            const user = {email:req.body.email,password:req.body.password}
            const accessToken = generateAccessToken(user)
            //const refreshToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
            //refreshTokens.push(refreshToken)
            //refreshToken:refreshToken
            return res.json({accessToken:accessToken})
        }else{
            return res.status(400).json("wrong password")
        }  
    }
    catch(error){
        return res.status(500).json({err:error})
    }
})



function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
	console.log({ token: process.env.ACCESS_TOKEN_SECRET, token2: authHeader})
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
     
    if (err) return res.sendStatus(403)
    console.log(req.body.email);
    req.user = user
    next()
  })

}

function generateAccessToken(user) {
    const myToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET , { expiresIn: '40m' })
    return myToken
}
 module.exports = router