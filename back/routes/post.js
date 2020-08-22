const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { User, Post, Image, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// uploads 폴더 생성
try{
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'hongstagram',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 },  // 20mb
});

// 게시물 업로드
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {  // POST /post
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const usertags = req.body.content.match(/@[^\s@]+/g);
    const post = await Post.create({
      content: req.body.content,
      commentAllow: req.body.commentAllow,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ // 있으면 가져오고 없으면 등록
        where: { name: tag.slice(1).toLowerCase() },
      })));
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (usertags) {
      const result = await Promise.all(usertags.map((tag) => User.findAll({ // 있으면 가져오고 없으면 등록
        where: { username: tag.slice(1) },
      })));
      await post.addUsertags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {  // 이미지를 여러개 올리면 image: [image1.png, image2.png]
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {  // 이미지를 하나만 올리면 image: image.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'username'],
        }],
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'username'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Bookmarkers',
        attributes: ['id'],
      }]
    })
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// 이미지 업로드
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/')));
});

router.get('/:postId/likes', isLoggedIn, async (req, res, next) => { // GET /1/likes
  try{
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const likes = await post.getLikers({
      attributes: ['id', 'username', 'name', 'src'],
    });
    return res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 특정 포스트 가져오기
router.get('/:postId', isLoggedIn, async (req, res, next) => { // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (post) {
      const fullPost = await Post.findOne({
        where: { id: post.id },
        include: [{
          model: User,
          attributes: ['id', 'username', 'src'],
          include: [{
            model: User,
            as: 'Followers',
            attributes: ['id'],
          }]
        }, {
          model: Image,
        }, {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'username', 'src'],
            order: [['createAt', 'DESC']],
          }],
        }, {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Bookmarkers',
          attributes: ['id'],
        }],
      });

      if (fullPost) {
        const data = fullPost.toJSON();
        data.User.isFollow = data.User.Followers.some((follower => follower.id === req.user.id));
        res.status(201).json(data);
      } else {
        return res.status(403).send('존재하지 않는 게시글입니다.');
      }
    } else {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;