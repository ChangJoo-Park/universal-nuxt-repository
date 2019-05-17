export default $axios => ({
  post: {
    index() {
      return $axios.get('/api/posts')
    },
    show(id, attributes) {
      return $axios.get(`/api/posts/${id}`)
    }
  },
  user: {}
})
