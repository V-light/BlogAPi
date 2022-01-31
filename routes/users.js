const router = require("express").Router();
const User = require("./../models/User");
const Post = require("./../models/Post");
const bcrypt = require("bcrypt");

// Update

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json({ message: "Update successful" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: "you can update only your account" });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
     
      try {
         await Post.deleteMany({username: req.body.username});
         await User.findByIdAndUpdate(req.params.id);
          
        res.status(200).json({ message: "Deltetd  successfully" });
      } catch (err) {
        res.status(500).json(err);
       }
    } else {
      res.status(500).json({ message: 'you can delete only your account'});
    }

    
  });

//Get a User

router.get('/:id', async ( req, res)=>{
    try{
        const user = await  User.findById(req.params.id);
        const {password , ...others} = user._doc;
        
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;
