<template>
  <div class="container">
    <div>
      <div>
        <nuxt-link :to="{ name: 'other' }">OTHER</nuxt-link>
      </div>
      <div>
        {{ posts }}
      </div>
      <logo />
      <h1 class="title">
        universal-nuxt-boilerplate
      </h1>
      <h2 class="subtitle">
        My marvelous Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green"
          >Documentation</a
        >
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
          >GitHub</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  asyncData(ctx) {
    console.log(ctx.app.$repositories)
    return ctx.app.$repositories.post.index().then(response => {
      return {
        posts: response.data
      }
    })
  },
  mounted() {
    this.$repositories.post
      .index()
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    this.$repositories.post
      .show(1)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
