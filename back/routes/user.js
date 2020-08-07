const express = require('express');

const { User, Post, Image, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {  // GET /user
  try {

  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;