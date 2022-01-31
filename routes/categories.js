const router = require("express").Router();
const Category = require("./../models/Category");

router.post('/', async(req, res, next) => {
    const newCat = await new Category(req.body);

    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;