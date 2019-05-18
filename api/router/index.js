import express from 'express'
import bodyParser from 'body-parser'
import { Post, User } from '../../models'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

export const createRouter = () => {
  const router = express.Router()
  router.use(bodyParser.json())
  router.get('/api/posts', (req, res) => {
    Post.findAll()
      .then(result => {
        res.json(result)
      })
      .catch(e => {
        res.status(500).json(e)
      })
  })
  router.get('/api/posts/:id', (req, res) => {
    Post.findByPk(parseInt(req.params.id))
      .then(result => {
        res.json(result)
      })
      .catch(e => {
        res.status(500).json(e)
      })
  })

  router.post('/api/posts', (req, res) => {
    const { title, body } = req.body
    Post.create({ title, body })
      .then(result => {
        res.json(result)
      })
      .catch(e => {
        res.status(500).json(e)
      })
  })
  router.put('/api/posts/:id', (req, res) => {
    const { title, body } = req.body
    Post.update({ title, body }, { where: { id: parseInt(req.params.id) } })
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
    res.json({})
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

  return router
}
