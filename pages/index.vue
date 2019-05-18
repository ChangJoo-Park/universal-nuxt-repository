<template>
  <div class="container mx-auto">
    <div>
      <div>
        <ul>
          <nuxt-link
            v-for="post in posts"
            :key="post.id"
            tag="li"
            class="border p-3 mb-3 cursor-pointer bg-blue-400 hover:bg-blue-600 hover:text-white"
            :to="{ name: 'posts-id', params: { id: post.id } }"
          >
            {{ post.title }} - {{ post.createdAt }} - {{ post.User.username }}
          </nuxt-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData(ctx) {
    return ctx.app.$repositories.post.index()
      .then((response) => {
        return { posts: response.data }
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
</style>
