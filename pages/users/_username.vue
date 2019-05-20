<template>
  <div class="container mx-auto">
    <h1>
      Hello World
      {{ user }}
    </h1>
  </div>
</template>

<script>
export default {
  asyncData({ app: { $repositories }, params, error }) {
    console.log('params -> username => ', params.username)
    return $repositories.user.show(params.username)
      .then((response) => {
        return {
          user: response.data
        }
      })
      .catch((e) => {
        error(e)
      })
  }
}
</script>

<style>

</style>
