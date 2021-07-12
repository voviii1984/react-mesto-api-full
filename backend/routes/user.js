const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findUsers,
  getUserProfile,
  findOneUser,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

router.get('/users', findUsers);

router.get('/users/me', getUserProfile);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), findOneUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^((http|https)?:\/\/)(w{3}\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.)+[A-Za-zА-Яа-я0-9-]{2,8}(([\w\-._~:/?#[\]@!$&'()*+,;=])*)?\/?#?/),
  }),
}), updateAvatar);

module.exports = router;
