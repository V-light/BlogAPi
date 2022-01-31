const router = require('express').Router();
const User = require('./../models/User');
const bcrypt = require('bcrypt');



//Register
router.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password:  hashedPassword
        })

        await user.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
})

//Login 

router.post('/login', async (req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(404).json({message: "Wrong Credintials"});

        const passwordCheck = await bcrypt.compare(req.body.password, user.password);

        !passwordCheck  && res.status(404).json({message: "Wrong Password"});

        const {password ,...others} = user._doc
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router