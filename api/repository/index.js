export default $axios => ({
  post: {
    index() {
      return $axios.get('/api/posts')
    },
    show(id, attributes) {
      return $axios.get(`/api/posts/${id}`)
    },
    create(attributes) {
      return $axios.post(`/api/posts`, {
        ...attributes
      })
    },
    update(id, attributes) {
      return $axios.put(`/api/posts/${id}`, {
        ...attributes
      })
    },
    delete(id) {
      return $axios.post(`/api/posts/${id}`)
    }
  },
  user: {}
})
