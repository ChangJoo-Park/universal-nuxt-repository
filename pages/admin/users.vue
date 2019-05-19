<template>
  <div>
    <h1 class="text-4xl">
      Users
    </h1>
    <div>
      <table class="w-full border border-2 text-center">
        <thead class="w-full border border-b-2 bg-gray-300">
          <tr>
            <th class="py-2 font-mono">ID</th>
            <th class="py-2 font-mono">username</th>
            <th class="py-2 font-mono">email</th>
            <th class="py-2 font-mono">createdAt</th>
            <th class="py-2 font-mono">updatedAt</th>
            <th class="py-2 font-mono">actions</th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr v-for="(row, index) in users" :key="index">
            <td class="py-2 border-b-2">{{ row.id }}</td>
            <td class="py-2 border-b-2">{{ row.username }}</td>
            <td class="py-2 border-b-2">{{ row.email }}</td>
            <td class="py-2 border-b-2">{{ row.createdAt }}</td>
            <td class="py-2 border-b-2">{{ row.updatedAt }}</td>
            <td class="py-2 border-b-2">
              <button @click="edit">
                EDIT
              </button>
              <button @click="destory">
                DESTORY
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
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
