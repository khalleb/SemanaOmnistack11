const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const routes = express.Router();
const Controller = require('./')
const moduleRoute = '/incidents'

const callbackFn = (res) => (data) => { res.send(data) }

routes.get(`${moduleRoute}`, celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), (req, res) => {
  Controller.list(req, res, callbackFn(res));
})

routes.post(`${moduleRoute}`, (req, res) => {
  Controller.create(req, res, callbackFn(res));
})

routes.delete(`${moduleRoute}/:id`, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), (req, res) => {
  Controller.delete(req, res, callbackFn(res))
})

module.exports = routes;