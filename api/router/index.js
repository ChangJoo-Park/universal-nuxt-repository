import express from 'express'
import bodyParser from 'body-parser'
import Sequelize from 'sequelize'
import jwt from 'jsonwebtoken'
import { Post, User, Category, Tag } from '../../models'
const passport = require('../passport')

const Op = Sequelize.Op

const makePostTags = async (tags = []) => {
  const tagsPromises = tags.map(name => Tag.findOrCreate({ where: { name }, defaults: { name }}))
  const storedTags = await Promise.all(tagsPromises)
  return storedTags.map(result => result[0])
}

export const createRouter = () => {
  const router = express.Router()
  router.use(bodyParser.json())

  router.get('/api/posts', (req, res) => {
    Post.findAll({
      include: [{ model: User }, { model: Category }],
      limit: 10,
      where: {
        published: true
      },
      order: [['createdAt', 'DESC']]
    })
      .then((result) => {
        res.json(result)
      })
      .catch((e) => {
        console.error(e)
        res.status(500).json(e)
      })
  })

  router.get('/api/posts/:id', async (req, res) => {
    Post.findByPk(parseInt(req.params.id), {
      include: [{ model: User }, { model: Category }, { model: Tag }]
    })
      .then((result) => {
        res.json(result)
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  })

  router.post('/api/posts', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, body, published, categoryId = null, tags = [] } = req.body
    try {
      const post = await Post.create({
        title,
        body,
        published,
        categoryId,
        userId: req.user.id
      })
      if (tags && tags.length > 0) {
        const settableTags = await makePostTags(tags)
        await post.setTags(settableTags)
      }
      res.json(post)
    } catch (error) {
      console.log('error => ', error)
      res.status(500).json(error)
    }
  })

  router.put('/api/posts/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const { title, body, published, categoryId = null, tags = [] } = req.body
      const publishedAt = published ? new Date() : null
      await Post.update({ title, body, published, publishedAt, categoryId }, { where: { id: parseInt(req.params.id) } })
      const post = await Post.findByPk(parseInt(req.params.id))
      const settableTags = await makePostTags(tags)
      await post.setTags(settableTags)
      res.json(post)
    } catch (error) {
      res.status(500).json(error)
    }
  })

  /**
   * Categories
   */
  router.get('/api/categories', (req, res) => {
    Category.findAll()
      .then((result) => {
        res.json(result)
      })
      .catch((e) => {
        console.error(e)
        res.status(500).json(e)
      })
  })

  router.get('/api/categories/:id', (req, res) => {
    Category.findByPk(parseInt(req.params.id), {
    })
      .then((result) => {
        res.json(result)
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  })

  router.post('/api/categories', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { name } = req.body
    Category.create({ name })
      .then((result) => {
        res.json(result)
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  })

  router.put('/api/categories/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { title, body, published } = req.body
    // TODO: move before update
    const publishedAt = published ? new Date() : null
    Post.update({ title, body, published, publishedAt }, { where: { id: parseInt(req.params.id) } })
      .then((result) => {
        res.json(result)
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  })

  router.delete('/api/categories/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params
    console.log('id => ', id)
    const category = await Category.findByPk(parseInt(id, 10))
    console.log('category => ', category)
    await category.destroy({ force: true })
    res.json({})
  })
  /**
   * Tags
   */
  router.get('/api/tags', (req, res) => {
    Tag.findAll()
      .then((result) => {
        res.json(result)
      })
      .catch((e) => {
        console.error(e)
        res.status(500).json(e)
      })
  })

  router.get('/api/tags/:id', (req, res) => {
    Tag.findByPk(parseInt(req.params.id), {
      include: [{ model: Post, include: [{ model: User }, {model: Category}] }]
    })
      .then((result) => {
        res.json(result)
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  })

  router.delete('/api/tags/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params
    console.log('id => ', id)
    const category = await Category.findByPk(parseInt(id, 10))
    console.log('category => ', category)
    await category.destroy({ force: true })
    res.json({})
  })
  /**
   * Authentication
   */
  router.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body
    // var payload = {id: user.id};
    // var token = jwt.sign(payload, jwtOptions.secretOrKey);
    User.findOne({ where: { email, password } })
      .then((result) => {
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
      .catch((error) => {
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
      .catch((error) => {
        res.status(500).json(error)
      })
  })

  /**
   * Users
   */
  router.get('/api/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findAll()
      .then((result) => {
        res.json(result)
      })
      .catch((error) => {
        res.status(500).json(error)
      })
  })

  router.get('/api/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('get username')
    const { username } = req.params
    console.log('username in router => ', username)
    User.findOne({ where: { username }})
      .then((result) => {
        res.json(result)
      })
      .catch((error) => {
        res.status(500).json(error)
      })
  })

  router.get('/api/users/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Success! You can not see this without a token', user: req.user })
  })


  return router
}
