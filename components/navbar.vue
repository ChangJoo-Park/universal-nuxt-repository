<template>
  <div class="container mx-auto mb-3 flex justify-between items-center">
    <div class="py-1 px-2">
      <img src="https://via.placeholder.com/150" alt="brand-logo" width="60px" height="60px">
    </div>
    <div>
      <template v-if="authenticated">
        <nuxt-link :to="{ name: 'index' }">
          HOME
        </nuxt-link>
        <nuxt-link :to="{ name: 'posts-new' }" class="nav-link">
          NEW POST
        </nuxt-link>
        <a href="#" @click.prevent="logout">Logout</a>
      </template>
      <template v-else>
        <nuxt-link :to="{ name: 'login' }" class="nav-link">
          LOGIN
        </nuxt-link>
        <nuxt-link :to="{ name: 'signup' }" class="nav-link">
          SIGN UP
        </nuxt-link>
      </template>
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

<style lang="postcss">
.nav-link {
  @apply text-blue-500 underline cursor-pointer mr-2;
}
</style>
