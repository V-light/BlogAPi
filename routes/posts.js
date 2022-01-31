const router = require("express").Router();
const User = require("./../models/User");
const Post = require("./../models/Post");


//Create Post 
router.post('/', async (req, res)=>{
    const post = await  new Post(req.body);
    try{
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err)
    }
})

//Update Post

router.put('/:id', async ( req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username=== req.body.username){
            try{
               const updatedPost =  await Post.findByIdAndUpdate(req.params.id, {$set: req.body});
               res.status(200).json(updatedPost);
            }catch(err){
                res.status(500).json(err);
            }

        }else{
            res.status(404).json({message: 'you can update only your post'});
        }

    } catch (err) {
        res.status(500).json(err);
    }
})

//Delete Post
router.delete('/:id', async ( req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username=== req.body.username){
            try{
               await post.delete();
               res.status(200).json({message: 'Post Has been deleted'});
            }catch(err){
                res.status(500).json(err);
            }

        }else{
            res.status(404).json({message: 'you can delete only your post'});
        }

    } catch (err) {
        res.status(500).json(err);
    }
})
// get a post
router.get('/:id', async ( req, res)=>{
    try{
        const user = await  Post.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
})


// get all post

router.get('/' , async (req, res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Post.find(username);
        }else if(catName){
            posts = await Post.find({categories: {$in: [catName]}});
        }else{
            posts = await Post.find();
        }

        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;