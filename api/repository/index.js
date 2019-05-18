import Cookies from 'js-cookie'
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
    me(token) {
      return $axios.get('/api/users/me', {
        headers: {
          authorization: token || Cookies.get('authorization')
        }
      })
    }
  }
})
