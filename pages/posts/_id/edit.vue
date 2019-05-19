<template>
  <div>
    <post-form :post="post" @submit="onSubmit" />
  </div>
</template>

<script>
import PostForm from '~/components/post-form.vue'

export default {
  components: {
    PostForm
  },
  asyncData({ app, params }) {
    return app.$repositories.post.show(params.id)
      .then((response) => {
        return {
          post: response.data
        }
      })
  },
  methods: {
    onSubmit(attributes) {
      return this.$repositories.post
        .update(this.post.id, attributes)
        .then((_) => {
          this.$router.push({ name: 'posts-id', params: { id: this.post.id } })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
