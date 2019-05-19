<template>
  <div class="w-full max-w-xs">
    <h1 class="text-4xl text-center font-bold mb-4">Login</h1>
    <div v-if="errors && errors.length > 0" class="mb-4">
      <div v-for="(error, index) in errors" :key="index" class="bg-red-500 p-2 text-white">
        {{ error }}
      </div>
    </div>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="onSubmit">
      <div class="mb-4">
        <label
          for="name"
          class="block text-gray-700 text-sm font-bold mb-2"
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
          class="block text-gray-700 text-sm font-bold mb-2"
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
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >
      <div>
      <nuxt-link
        :to="{ name: 'signup' }"
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
      >
        Sign up
      </nuxt-link>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2019 BRAND Corp. All rights reserved.
    </p>
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
