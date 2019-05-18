<template>
  <div class="container mx-auto">
    <h1 class="text-4xl">
      NEW POST
    </h1>
    <post-form
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
    onSubmit({ title, body }) {
      this.$repositories.post.create({ title, body })
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
