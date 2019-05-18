<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="">EMAIL</label>
      <input v-model="email" type="email" required class="border">
      <label for="">PASSWORD</label>
      <input v-model="password" type="password" required class="border">
      <input type="submit">
    </form>

    <div>
      {{ authenticated }}
    </div>
    <nuxt-link :to="{ name: 'secret' }">
      SECRET
    </nuxt-link>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['authenticated'])
  },
  methods: {
    ...mapActions(['setToken', 'setUser']),
    onSubmit() {
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
          console.error('error => ', error)
        })
    }
  }
}
</script>

<style>

</style>
