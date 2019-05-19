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
      return $axios.delete(`/api/posts/${id}`)
    }
  },
  category: {
    index() {
      return $axios.get('/api/categories')
    },
    create(attributes) {
      return $axios.post(`/api/categories`, {
        ...attributes
      })
    },
    update(id, attributes) {
      return $axios.put(`/api/categories/${id}`, {
        ...attributes
      })
    },
    delete(id) {
      console.log('delete category => ', id)
      return $axios.delete(`/api/categories/${id}`)
    }
  },
  auth: {
    login(attributes) {
      return $axios.post('/api/auth/login', attributes)
    },
    logout() {
      return $axios.delete('/api/auth/logout')
    },
    signup(attributes) {
      return $axios.post('/api/auth/signup', attributes)
    }
  },
  user: {
    index() {
      return $axios.get('/api/users')
    },
    me() {
      return $axios.get('/api/users/me')
    }
  }
})
