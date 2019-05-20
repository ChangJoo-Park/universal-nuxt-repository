<template>
  <div class="container mx-auto">
    <h1 class="text-4xl">
      {{ tag.name }}
    </h1>
    <div v-for="post in tag.Posts" :key="post.id">
      <nuxt-link :to="{ name: 'posts-id', params: { id: post.id} }">
        {{ post.title }} - {{ post.User.username }} - <span v-if="post.Category">{{ post.Category.name }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ app: { $repositories }, params, error }) {
    return $repositories.tag.show(params.id)
      .then((response) => {
        return {
          tag: response.data
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
