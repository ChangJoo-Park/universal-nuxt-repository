<template>
  <div class="container mx-auto">
    <div>
      <div class="mb-3">
        <nuxt-link :to="{ name: 'posts-new' }" class="text-blue-500 underline">
          NEW
        </nuxt-link>
        <nuxt-link :to="{ name: 'login' }" class="text-blue-500 underline">
          LOGIN
        </nuxt-link>
        <nuxt-link :to="{ name: 'signup' }" class="text-blue-500 underline">
          SIGN UP
        </nuxt-link>
      </div>
      <div>
        <ul>
          <nuxt-link
            v-for="post in posts"
            :key="post.id"
            tag="li"
            class="border p-3 mb-3 cursor-pointer bg-blue-400 hover:bg-blue-600 hover:text-white"
            :to="{ name: 'posts-id', params: { id: post.id } }"
          >
            {{ post.title }} - {{ post.createdAt }}
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
