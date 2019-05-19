import express from 'express'
import bodyParser from 'body-parser'
import { Post, User } from '../../models'
import Sequelize from 'sequelize'
import jwt from 'jsonwebtoken'
const passport = require('../passport')

const Op = Sequelize.Op
const opts = {}

export const createRouter = () => {
  const router = express.Router()
  router.use(bodyParser.json())

  router.get('/api/posts', (req, res) => {
    Post.findAll({
      include: [{ model: User }],
      limit: 10
    })
      .then(result => {
        res.json(result)
      })
      .catch(e => {
        res.status(500).json(e)
      })
  })

  router.get('/api/posts/:id', (req, res) => {
    Post.findByPk(parseInt(req.params.id), {
      include: [{ model: User }]
    })
      .then(result => {
        res.json(result)
      })
      .catch(e => {
        res.status(500).json(e)
      })
  })

  router.post('/api/posts', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { title, body, published } = req.body
    console.log('post published => ', published)
    Post.create({ title, body, published, userId: req.user.id })
      .then(result => {
        res.json(result)
      })
      .catch(e => {
        res.status(500).json(e)
      })
  })

  router.put('/api/posts/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { title, body, published } = req.body
    // TODO: move before update
    const publishedAt = published ? new Date() : null
    Post.update({ title, body, published, publishedAt }, { where: { id: parseInt(req.params.id) } })
      .then(result => {
        res.json(result)
      })
      .catch(e => {
        res.status(500).json(e)
      })
  })

  /**
   * Authentication
   */
  router.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body
    // var payload = {id: user.id};
    // var token = jwt.sign(payload, jwtOptions.secretOrKey);
    User.findOne({ where: { email, password } })
      .then(result => {
        if (result) {
          const payload = { id: result.id }
          const token = jwt.sign(payload, 'secret')
          return res.json({
            user: result,
            token
          })
        }
        return res.status(404).json({})
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  })

  router.delete('/api/auth/logout', (req, res) => {
    res.json({})
  })

  router.post('/api/auth/signup', (req, res) => {
    const { email, username, password } = req.body
    User.findOrCreate({
      attributes: ['email', 'username'],
      where: {
        [Op.or]: [{ email }, { username }]
      },
      defaults: { email, username, password }
    })
      .then(([user, created]) => {
        if (created) {
          return res.json(user)
        }

        const duplicatedUsername = username === user.username
        const duplicatedEmail = email === user.email

        return res.status(400).json({
          duplicated: {
            username: duplicatedUsername,
            email: duplicatedEmail
          }
        })
      })
      .catch(error => {
        res.status(500).json(error)
      })
  })

  /**
   * Users
   */
  router.get('/api/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findAll()
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  })
  router.get('/api/users/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: "Success! You can not see this without a token", user: req.user })
  })

  return router
}
