<template>
  <div class="mb-3">
    <div v-if="authenticated">
      <nuxt-link :to="{ name: 'index' }">
        HOME
      </nuxt-link>
      <nuxt-link :to="{ name: 'posts-new' }" class="text-blue-500 underline">
        NEW POST
      </nuxt-link>
      <a href="#" @click.prevent="logout">Logout</a>
    </div>
    <div v-else>
      <nuxt-link :to="{ name: 'login' }" class="text-blue-500 underline">
        LOGIN
      </nuxt-link>
      <nuxt-link :to="{ name: 'signup' }" class="text-blue-500 underline">
        SIGN UP
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'

export default {
  computed: {
    ...mapGetters(['authenticated'])
  },
  methods: {
    ...mapActions(['setUser', 'setToken']),
    logout() {
      this.setUser(null)
      this.setToken(null)
      Cookies.remove('authorization')
    }
  }
}
</script>

<style>

</style>
