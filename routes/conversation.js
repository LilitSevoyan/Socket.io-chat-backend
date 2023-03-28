const express = require('express')
const router = express.Router()
const Conversation = require("../models/Conversation")

router.get('/:userId',async(req,res)=>{
   
    try{
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.json(conversation)
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

router.post('/',async(req,res)=>{
    let newConversation = new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })
    try{
        await newConversation.save()
        res.json(newConversation)
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

module.exports = router