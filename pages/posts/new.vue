<template>
  <div class="w-full h-full">
    <post-form
      class="container mx-auto"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import PostForm from '~/components/post-form.vue'

export default {
  middleware: ['authenticated'],
  components: {
    PostForm
  },
  methods: {
    onSubmit({ title, body, published }) {
      this.$repositories.post.create({ title, body, published })
        .then(({ data }) => {
          this.$router.push({
            name: 'posts-id',
            params: {
              id: data.id
            }
          })
        })
    }
  }
}
</script>
