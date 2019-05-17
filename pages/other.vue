<template>
  <div>
    <h1>Hello World</h1>
    <nuxt-link :to="{ name: 'index' }">
      INDEX
    </nuxt-link>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$repositories.post
      .index()
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
