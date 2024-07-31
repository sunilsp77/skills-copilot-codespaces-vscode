// Create web server

// Import express
const express = require('express');
const app = express();

// Import body-parser
const bodyParser = require('body-parser');

// Import mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Import Comment model
const Comment = require('./models/comment');

// Use body-parser
app.use(bodyParser.json());

// Get all comments
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

// Post new comment
app.post('/comments', async (req, res) => {
    const comment = new Comment({
        text: req.body.text
    });

    await comment.save();
    res.json(comment);
});

// Delete comment
app.delete('/comments/:id', async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
});

// Update comment
app.put('/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    comment.text = req.body.text;
    await comment.save();
    res.json(comment);
});

// Start server
app.listen(3000, () => {
    console.log('Server started');
});