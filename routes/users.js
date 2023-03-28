const express = require('express')
const router = express.Router()
const User = require("../models/User")
//const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");



router.get("/userall",async (req,res)=>{
    try{
        let user = await User.find({})
        res.json({user})
        
    }catch(error){
        res.status(500).json({err:error})
    }
})

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    res.json(user)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username } = friend;
      friendList.push({ _id, username});
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});


 router.put("/follow/:id", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });
 
 module.exports = router