export const state = () => ({
  user: null,
  token: ''
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = token
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    // const authorization = Cookies.get('authorization')
    if (req.cookies.authorization) {
      try {
        commit('setToken', req.cookies.authorization)
        const response = await app.$repositories.user.me()
        const { user } = response.data
        commit('setUser', user)
      } catch (error) {
        commit('setUser', null)
      }
    }
  },
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  setToken({ commit }, token) {
    commit('setUser', `bearer ${token}`)
  }
}

export const getters = {
  authenticated: state => !!state.user
}
