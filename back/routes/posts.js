const express = require('express');
const { Op } = require('sequelize');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {  // GET /posts
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const follows = await user.getFollows();
    const followId = follows.map((follow) => follow.id);

    const where = {UserId: [req.user.id, ...followId]};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
    }
    const posts = await Post.findAll({
      where,
      limit: 8,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'username', 'src'],
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
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/explore', async (req, res, next) => {  // GET /posts/explore
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const follows = await user.getFollows();
    const userId = [];
    follows.forEach((follow) => userId.push(follow.id));
    
    const where = {UserId: {
      [Op.notIn]: [req.user.id, ...userId],
    }};
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
        attributes: ['id', 'username', 'src'],
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
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:username', isLoggedIn, async (req, res, next) => {  // GET /posts/1
  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (user) {
      const where = {};
      if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
      }
      const posts = await user.getPosts({
        where,
        limit: 12,
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
        include: [{
          model: User,
          attributes: ['id', 'username', 'src'],
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
        }],
      });
      res.status(200).json(posts);
    } else {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;