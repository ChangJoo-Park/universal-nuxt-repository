<template>
  <div class="w-3/5 max-w-md">
    <h1 class="text-4xl text-center font-bold mb-4">Login to BRAND</h1>
    <div v-if="errors && errors.length > 0" class="mb-4">
      <div v-for="(error, index) in errors" :key="index" class="bg-red-500 p-2 text-white">
        {{ error }}
      </div>
    </div>
    <form class="mb-4" @submit.prevent="onSubmit">
      <div class="mb-4">
        <label
          for="name"
          class="block mb-1"
        >
          Email
        </label>
        <input
          id="name"
          v-model="email"
          type="email"
          autofocus
          autocomplete="email"
          required
          class="w-full bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        >
      </div>
      <div class="mb-4">
        <label
          for="password"
          class="block mb-1"
        >
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="password"
          required
          class="w-full bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        >
      </div>
      <input
        type="submit"
        class="w-full px-3 py-2 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer"
      >
    </form>
    <nuxt-link
      :to="{ name: 'signup' }"
      class="no-underline hover:underline block mb-4"
    >
      Sign up
    </nuxt-link>
    <nuxt-link
      :to="{ name: 'index' }"
      class="no-underline hover:underline block"
    >
      Back To Main
    </nuxt-link>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'fullscreen',
  data() {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  computed: {
    ...mapGetters(['authenticated'])
  },
  methods: {
    ...mapActions(['setToken', 'setUser']),
    onSubmit() {
      this.errors = []
      this.$repositories.auth.login({
        email: this.email,
        password: this.password
      })
        .then((response) => {
          const { token, user } = response.data
          Cookies.set('authorization', `bearer ${token}`)
          this.setToken(`bearer ${token}`)
          this.setUser(user)
          this.$router.push({ name: 'index' })
        })
        .catch((error) => {
          console.log('STATUS => ', error.response.status)
          if (error.response && error.response.status) {
            this.errors.push('로그인에 실패하였습니다. 계정을 확인하세요.')
          }
        })
    }
  }
}
</script>

<style>

</style>
