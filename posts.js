const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const POSTS_FILE = path.join(__dirname, '..', 'data', 'posts.json');

const readPosts = () => JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
const writePosts = (posts) => fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));

// GET all posts (public)
router.get('/', (req, res) => {
  try {
    const posts = readPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new post (auth required)
router.post('/', (req, res) => {
  try {
    const { title, body, tag, category, ...other } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required.' });
    }
    const posts = readPosts();
    const newPost = {
      id: Date.now(),
      userId: req.piUser.uid,
      author: req.piUser.username,
      handle: `@${req.piUser.username}`,
      avatar: '👤',
      avatarBg: '#888',
      tag: tag || 'Tip',
      tagColor: '#2563EB',
      category: category || 'tip',
      time: 'Just now',
      title,
      body,
      image: '📝',
      imageBg: '#eee',
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
      bookmarked: false,
      reposts: 0,
      reposted: false,
      isVideo: false,
      followers: 0,
      ...other
    };
    posts.unshift(newPost);
    writePosts(posts);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update post (only owner)
router.put('/:id', (req, res) => {
  try {
    const posts = readPosts();
    const idx = posts.findIndex(p => p.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    if (posts[idx].userId !== req.piUser.uid) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    posts[idx] = { ...posts[idx], ...req.body, id: posts[idx].id, userId: posts[idx].userId };
    writePosts(posts);
    res.json(posts[idx]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH like (auth)
router.patch('/:id/like', (req, res) => {
  try {
    const posts = readPosts();
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    writePosts(posts);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH save
router.patch('/:id/save', (req, res) => {
  try {
    const posts = readPosts();
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.saved = !post.saved;
    writePosts(posts);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH bookmark
router.patch('/:id/bookmark', (req, res) => {
  try {
    const posts = readPosts();
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.bookmarked = !post.bookmarked;
    writePosts(posts);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH repost
router.patch('/:id/repost', (req, res) => {
  try {
    const posts = readPosts();
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.reposted = !post.reposted;
    post.reposts += post.reposted ? 1 : -1;
    writePosts(posts);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;