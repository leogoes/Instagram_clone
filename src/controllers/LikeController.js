const Post = require('../models/Post');


module.exports = {

    async store(req, res)
    {
        //Receive params by URL, find the post related and storage in post const
        const post = await Post.findById(req.params.id);

        //access the like property and count + 1  
        post.likes += 1;
        
        //Save the counter
        await post.save();

        req.io.emit('like', post);

        //return the new like counter 
        return res.json(post);
    }
};