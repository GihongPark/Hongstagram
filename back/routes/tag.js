const express = require('express');
const { Op } = require('sequelize');

const { User, Post, Image, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/:username', isLoggedIn, async (req, res, next) => {  // GET /tag/1
  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (user) {
      const where = {};
      if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
      }
      const tag = await user.getUsertaged({
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
            attributes: ['id', 'username'],
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
      res.status(200).json(tag);
    } else {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:tag/search', isLoggedIn, async (req, res, next) => {  // GET /tag/1/search
  try {
    const users = await Hashtag.findAll({
      where: {name: {[Op.like]: `%${req.params.tag}%`}},
      attributes: ['name'],
    })

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:tag/posts', isLoggedIn, async (req, res, next) => {  // GET /tag/1/posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.tag) },
      }, {
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

module.exports = router;