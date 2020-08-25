const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

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
// 이미지 업로드
router.post('/image', isLoggedIn, upload.single('image'), async (req, res, next) => { // POST /user/image
  await User.update({
    src: req.file.location.replace(/\/original\//, '/thumb/')
  }, {
    where: {
      id: req.user.id
    }
  })
  res.status(200).json(req.file.location.replace(/\/original\//, '/thumb/'));
});
// 이미지 업로드
router.delete('/image', isLoggedIn, async (req, res, next) => { // POST /user/image
  await User.update({
    src: null
  }, {
    where: {
      id: req.user.id
    }
  })
  res.status(200).send('ok');
});

router.get('/:username/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
  try {
    const user = await User.findOne({ where: { username: req.params.username }});
    console.log(user);
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
    const followers = await user.getFollowers({
      attributes: ['id', 'username', 'name', 'src'],
    });
    console.log("f: ", followers)
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:username/follows', async (req, res, next) => { // GET /user/1/follows
  try {
    const user = await User.findOne({ where: { username: req.params.username }});
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
    console.log(req.query);
    const follows = await user.getFollows({
      attributes: ['id', 'username', 'name', 'src'],
    });
    res.status(200).json(follows);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 내 프로필 정보
router.get('/', isLoggedIn, async (req, res, next) => {  // GET /user
  try {
    if (req.user) {
      const MyProfileInfo = await User.findOne({
        where: {id: req.user.id},
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Follows'
        }, {
          model: User,
          as: 'Followers'
        }]
      });
      if (MyProfileInfo) {
        const data = MyProfileInfo.toJSON();
        data.Posts = data.Posts.length;
        data.Follows = data.Follows.length;
        data.Followers = data.Followers.length;
        res.status(200).json(data);
      } else {
        res.status(403).send('존재하지 않는 사용자입니다');
      }
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// 다른 유저 프로필 정보
router.get('/:username', isLoggedIn, async (req, res, next) => {  // GET /user/1
  try {
    const UserProfileInfo = await User.findOne({
      where: { username: req.params.username },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Follows'
      }, {
        model: User,
        as: 'Followers'
      }]
    });
    if (UserProfileInfo) {
      const data = UserProfileInfo.toJSON();
      data.Posts = data.Posts.length;
      data.Follows = data.Follows.length;
      data.isFollow = data.Followers.some((follower) => follower.id === req.user.id);
      data.Followers = data.Followers.length;
      res.status(200).json(data);
    } else {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 유저리스트
router.get('/:username/search', isLoggedIn, async (req, res, next) => {  // GET /user/1/search
  try {
    const users = await User.findAll({
      where: {username: {[Op.like]: `%${req.params.username}%`}},
      attributes: ['username'],
    })

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 프로필 변경
router.patch('/edit', isLoggedIn, async (req, res, next) => {  // PATCH /user/edit
  try {
    const exUsername = await User.findOne({
      where: {
        username: req.body.username,
      }
    });
    if (exUsername) {
      return res.status(403).send('이미 사용중인 사용자 이름 입니다.');
    }

    const values = {};
    if (req.body.username) {
      values.username = req.body.username;
    }
    if (req.body.name) {
      values.name = req.body.name;
    }
    await User.update(
      values, 
    {
      where: {id: req.user.id},
    });
    const user = await User.findOne({
      where: {id: req.user.id},
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Follows'
      }, {
        model: User,
        as: 'Followers'
      }]
    });
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.patch('/edit/pwd', isLoggedIn, async (req, res, next) => {  //PATCH  /user/edit/pwd
  try {
    const user = await User.findOne({
      where: {id: req.user.id},
    });
    const result = await bcrypt.compare(req.body.exPassword, user.password);
    if (result) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.update({
        password: hashedPassword,
      }, {
        where: {id: req.user.id},
      });

      const user = await User.findOne({
        where: {id: req.user.id},
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Follows'
        }, {
          model: User,
          as: 'Followers'
        }]
      });
      res.status(200).json(user);
    } else {
      res.status(403).send('비밀번호가 틀렸습니다');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.patch('/edit/visibility', isLoggedIn, async (req, res, next) => {  // PATCH  /user/edit/visibility
  try {
    await User.update({
      visibility: req.body.visibility,
    }, {
      where: {id: req.user.id},
    });
    res.status(200).send('ok');
  } catch (error) {
    console.error({visibility: req.body.visibility});
    next(error);
  }
});

// 팔로우하기
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// 언팔로우하기
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// 팔로워 끊기
router.delete('/:userId/follower', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follower
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
    await user.removeFollows(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 회원가입
router.post('/signup', isNotLoggedIn, async (req, res, next) => {  // POST  /user/signup
  try {
    // 기존 사용자 찾기
    const exEmail = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exEmail) {
      return res.status(403).send('이미 사용중인 이메일 입니다.');
    }
    const exUsername = await User.findOne({
      where: {
        username: req.body.username,
      }
    });
    if (exUsername) {
      return res.status(403).send('이미 사용중인 사용자 이름 입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);  // 두번째 인수는 10~13의 숫자를 넣어준다 (수가 클수록 보안이 올라감)
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
      name: req.body.name,
    });

    res.setHeader
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게스트 로그인
router.post('/guestLogin', isNotLoggedIn, async (req, res, next) => {  // POST  /user/guestLogin
  req.body.email = 'guest@email.com';
  req.body.password = process.env.GUEST_PASSWORD;
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const LoginUserInfo = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'username', 'src'],
      });
      return res.status(200).json(LoginUserInfo);
    });
  })(req, res, next);
});

// 로그인
router.post('/login', isNotLoggedIn, async (req, res, next) => {  // POST  /user/login
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const LoginUserInfo = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'username', 'src'],
      });
      return res.status(200).json(LoginUserInfo);
    });
  })(req, res, next);
});

// 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {  // POST  /user/logout
  req.logout();
  req.session.destroy();
  res.status(200).send('ok');
});

module.exports = router;