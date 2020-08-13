const express = require('express');
const { Op } = require('sequelize');

const { User, Post, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/:postId', isLoggedIn, async (req, res, next) => {  // POST /comment/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        PostId: parseInt(req.params.postId),
        UserId: req.user.id,
      });
      const fullComment = await Comment.findOne({
        where: { id: comment.id },
        include: [{
          model: User,
          attributes: ['id', 'username', 'src'],
        }],
      })
      res.status(201).json(fullComment);
    } else {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:commentId', isLoggedIn, async (req, res, next) => {  // DELETE /comment/1
  try {
    await Comment.destroy({
      where: {
        id: req.params.commentId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ CommentId: parseInt(req.params.commentId, 10) });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// router.get('/:postId', isLoggedIn, async (req, res, next) => {  // GET /Comment/1
//   try {
//     const where = {};
//     if (parseInt(req.query.lastId, 10)) {
//       where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
//     }
//     const comments = await Post.findAll({
//       where, 
//     })
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

module.exports = router;
