<template>
  <div class="border border-b-2 border-black fixed w-full bg-black text-white shadow">
    <div class="container flex justify-between items-center mx-auto">
      <div class="py-1 px-2">
        <a href="/">
          <img src="https://via.placeholder.com/150" alt="brand-logo" width="60px" height="60px">
        </a>
      </div>
      <div>
        <template v-if="authenticated">
          <nuxt-link
            v-if="admin"
            :to="{ name: 'admin' }"
            class="text-white cursor-pointer no-underline"
          >
            ADMIN
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'posts-new' }"
            class="text-white cursor-pointer no-underline"
          >
            New Post
          </nuxt-link>
          <nuxt-link
            v-if="user"
            :to="{ name: 'users-username', params: { username: user.username} }"
            class="text-white cursor-pointer no-underline"
          >
            {{ user.username }}
          </nuxt-link>
          <a href="#" @click.prevent="logout">Logout</a>
        </template>
        <template v-else>
          <nuxt-link
            :to="{ name: 'login' }"
            class="text-white cursor-pointer no-underline hover:underline"
          >
            Login
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'signup' }"
            class="text-white cursor-pointer no-underline hover:underline"
          >
            Sign Up
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'

export default {
  computed: {
    ...mapGetters(['authenticated', 'admin', 'user'])
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
</style>
