import express from 'express'
import bodyParser from 'body-parser'
import { Post } from '../../models'

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
  return router
}
