<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="">EMAIL</label>
      <input v-model="email" type="email" required class="border">
      <label for="">PASSWORD</label>
      <input v-model="password" type="password" required class="border">
      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      window.alert('hello')
      this.$repositories.auth.login({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style>

</style>
