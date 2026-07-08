const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const COMMENTS_FILE = path.join(__dirname, '..', 'data', 'comments.json');

const readComments = () => {
  try { return JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf-8')); } catch { return {}; }
};
const writeComments = (data) => fs.writeFileSync(COMMENTS_FILE, JSON.stringify(data, null, 2));

// GET comments for a post
router.get('/:postId', (req, res) => {
  try {
    const comments = readComments();
    res.json(comments[req.params.postId] || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new comment
router.post('/:postId', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    const comments = readComments();
    if (!comments[req.params.postId]) comments[req.params.postId] = [];
    const newComment = {
      id: Date.now(),
      userId: req.piUser.uid,
      user: req.piUser.username,
      avatar: '👤',
      text,
      likes: 0,
      liked: false,
      replies: []
    };
    comments[req.params.postId].push(newComment);
    writeComments(comments);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;