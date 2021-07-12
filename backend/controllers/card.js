const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports = {
  findCards(req, res, next) {
    Card.find({})
      .then((cards) => res.send({ cards }))
      .catch(next);
  },
  createCard(req, res, next) {
    // console.log(req.user._id);
    const owner = req.user._id;
    const { name, link } = req.body;

    Card.create({ name, link, owner })
      .then((card) => res.send({ card }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные при создании карточки'));
        }
        return next(err);
      });
  },
  likeCard(req, res, next) {
    Card.findByIdAndUpdate(req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true })
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Переданы некорректные данные для постановки лайка.');
        }
        res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new BadRequestError('Переданы некорректные данные карточки'));
        }
        return next(err);
      });
  },
  dislikeCard(req, res, next) {
    Card.findByIdAndUpdate(req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true })
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Переданы некорректные данные для снятии лайка.');
        }
        res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new BadRequestError('Переданы некорректные данные карточки'));
        }
        return next(err);
      });
  },
  deleteCard(req, res, next) {
    Card.findByIdAndDelete(req.params.cardId)
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Карточка с указанным _id не найдена.');
        }
        if (card.owner.toString() !== req.user._id) {
          throw new ForbiddenError('Можно удалять только свои карточки.');
        } else {
          Card
            .findByIdAndRemove(req.params.cardId)
            .then(() => res.send({ card }));
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new BadRequestError('Переданы некорректные данные карточки'));
        }
        return next(err);
      });
  },
};
