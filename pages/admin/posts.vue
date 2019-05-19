<template>
  <div>
    <h1 class="text-4xl">
      Posts
    </h1>
    <div>
      <table-component :data="posts" />
    </div>
  </div>
</template>

<script>
import TableComponent from '~/components/admin/table.vue'

export default {
  components: {
    TableComponent
  },
  asyncData({ app, error }) {
    return app.$repositories.post.index()
      .then((response) => {
        return {
          posts: response.data
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
