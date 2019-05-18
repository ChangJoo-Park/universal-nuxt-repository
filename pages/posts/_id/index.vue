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

    <div class="mb-4">
      {{ post.User }}
    </div>

    <nuxt-link
      v-if="author"
      :to="{ name: 'posts-id-edit', params: { id: post.id } }"
      tag="div"
      class="px-3 py-2 border-green-400 bg-green-400 hover:bg-green-600 cursor-pointer text-white"
    >
      수정
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  asyncData({ app, params, store }) {
    return app.$repositories.post.show(params.id)
      .then((response) => {
        return {
          post: response.data
        }
      })
  },
  computed: {
    ...mapGetters(['user']),
    author() {
      if (this.user && this.post.User) {
        return this.user.id === this.post.User.id
      }
      return false
    }
  }
}
</script>
