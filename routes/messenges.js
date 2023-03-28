const express = require('express')
const router = express.Router()
const Message = require("../models/Messenge")

router.post('/',async(req,res)=>{
    const newMessage = new Message({
        ...req.body
    })
    try{
        await newMessage.save()
        res.json({newMessage})
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

router.get("/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router