export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    // const authorization = Cookies.get('authorization')
    console.log('req.cookies.authorization => ', req.cookies.authorization)
    if (req.cookies.authorization) {
      const response = await app.$repositories.user.me(req.cookies.authorization)
      const { user } = response.data
      commit('setUser', user)
    }
  },
  setUser({ commit }, user) {
    console.log('user => ', user)
    commit('setUser', user)
  }
}

export const getters = {
  authenticated: state => !!state.user
}
