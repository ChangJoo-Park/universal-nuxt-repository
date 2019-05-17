import express from 'express'
import bodyParser from 'body-parser'

export const createRouter = () => {
  const router = express.Router()
  router.use(bodyParser.json())
  router.get('/api/posts', (req, res) => {
    res.json([])
  })
  router.get('/api/posts/:id', (req, res) => {
    res.json({})
  })
  return router
}
