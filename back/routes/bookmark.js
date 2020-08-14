const express = require('express');
const { Op, where } = require('sequelize');

const { Post, User, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.patch('/:postId', isLoggedIn, async (req, res, next) => {  // PATCH /bookmark/1
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (post) {
      await post.addBookmarkers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } else {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {  // DELETE /bookmark/1
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (post) {
      await post.removeBookmarkers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id })
    } else {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {  // GET /bookmark
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
    }
    const posts = await Post.findAll({
      where,
      limit: 12,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'username'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'username', 'src'],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Bookmarkers',
        attributes: ['id'],
        where: {
          id: req.user.id
        }
      }]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
