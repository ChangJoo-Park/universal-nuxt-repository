<template>
  <div>
    <div class="mb-4">
      <h1 class="text-5xl">
        {{ post.title }}
      </h1>
      <div class="text-xl">
        {{ post.body }}
      </div>
    </div>
    <div>
      <nuxt-link
        :to="{ name: 'posts-id-edit', params: { id: post.id } }"
        class="px-3 py-2 border-green-400 bg-green-400 hover:bg-green-600 cursor-pointer text-white"
      >
        수정
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ app, params }) {
    return app.$repositories.post.show(params.id)
      .then((response) => {
        return {
          post: response.data
        }
      })
  }
}
</script>
