<template>
  <div>
    <div class="mb-4">
      <h1 class="text-5xl">
        {{ post.title }}
      </h1>
      <div>
        <nuxt-link
          v-for="tag in post.Tags"
          :key="tag.id"
          :to="{ name: 'tags-tagname', params: { tagname: tag.name } }"
          class="text-blue-400 hover:text-blue-600 no-underline"
        >
          {{ tag.name }}
        </nuxt-link>
      </div>
      <div v-if="post.Category">
        <span class="text-red-600">{{ post.Category.name }}</span>
      </div>
      <div class="mb-4">
        {{ post.published }}
      </div>
      <div class="mb-4">
        <nuxt-link :to="{ name: 'users-username', params: { username: post.User.username } }">
          {{ post.User.username }} - {{ post.User.email }}
        </nuxt-link>
      </div>
      <post-content :content="post.body" class="p-4" />
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
import PostContent from '~/components/post-content.vue'

export default {
  components: {
    PostContent
  },
  computed: {
    ...mapGetters(['user']),
    author() {
      if (this.user && this.post.User) {
        return this.user.id === this.post.User.id
      }
      return false
    }
  },
  asyncData({ app, params, store }) {
    return app.$repositories.post.show(params.id)
      .then((response) => {
        return {
          post: response.data
        }
      })
  }
}
</script>
