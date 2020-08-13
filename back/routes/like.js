const express = require('express');
const { Op } = require('sequelize');

const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.patch('/:postId', isLoggedIn, async (req, res, next) => {  // PATCH /like/1
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (post) {
      await post.addLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } else {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {  // DELETE /like/1
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (post) {
      await post.removeLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id })
    } else {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
