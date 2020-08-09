const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
    const followers = await user.getFollowers({
      attributes: ['id', 'username', 'name'],
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/follows', isLoggedIn, async (req, res, next) => { // GET /user/follows
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다');
    }
    const follows = await user.getFollows({
      attributes: ['id', 'username', 'name'],
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(follows);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 내 프로필 정보
router.get('/', async (req, res, next) => {  // GET /user
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
router.get('/:userId', async (req, res, next) => {  // GET /user/1
  try {
    const UserProfileInfo = await User.findOne({
      where: { id: req.params.userId },
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

// 프로필 변경
router.patch('/edit', isLoggedIn, async (req, res, next) => {  // PATCH /user/edit
  try {
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
    res.status(200).send('ok');
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
      res.status(200).send('ok');
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
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 이메일 입니다.');
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
        attributes: ['username', 'src'],
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