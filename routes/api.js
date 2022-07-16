const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = require('../model/posts.js');

const options = {
    origins: "http://localhost:3000"
}

router.use(cors(options));

router.get('/all', (req, res) => {
    
    res.json(JSON.stringify(posts.getAll()));

});

router.post('/new', bodyParser.json(), (req, res) => {
    
    let title = req.body.title;
    let description = req.body.description;

    posts.newPost(title, description);

    res.send('Post adicionado');
});

router.delete('/delete', bodyParser.json(), (req, res) => {
    let postId = req.body.id;

    posts.deletePost(postId);

    res.send('Post adicionado');
});

module.exports = router;