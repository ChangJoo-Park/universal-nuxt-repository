<template>
  <div>
    <h1 class="text-4xl">
      Users
    </h1>
    <div>
      <table-component :data="users" />
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
    return app.$repositories.user.index()
      .then((response) => {
        return {
          users: response.data
        }
      })
      .catch((e) => {
        error(e)
      })
  },
  methods: {
    edit() {},
    destory() {}
  }
}
</script>

<style>

</style>
