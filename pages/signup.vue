<template>
  <div class="">
    <form @submit.prevent="onSubmit">
      <div>
        <label for="">Email</label>
        <input
          v-model="email"
          type="email"
          autofocus
          autocomplete="email"
          required
          class="border"
        >
      </div>
      <div>
        <label for="">Username</label>
        <input v-model="username" type="text" required class="border">
      </div>
      <div>
        <label for="">Password</label>
        <input v-model="password" type="password" required class="border">
      </div>
      <div>
        {{ errors }}
      </div>
      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  layout: 'fullscreen',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = []
      this.$repositories.auth.signup({
        email: this.email,
        password: this.password,
        username: this.username
      })
        .then((response) => {
          this.$router.push({
            name: 'login'
          })
        })
        .catch((e) => {
          if (e.response.status === 400) {
            const { email, username } = e.response.data.duplicated
            if (email) {
              this.errors.push('Email is Exists')
            }
            if (username) {
              this.errors.push('Username is Exists')
            }
          }
        })
    }
  }
}
</script>

<style>

</style>
