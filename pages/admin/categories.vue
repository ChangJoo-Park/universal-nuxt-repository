<template>
  <div>
    <h1 class="text-4xl">
      Categories
    </h1>
    <div class="p-4">
      <form @submit.prevent="onSubmit">
        <div>
          <input v-model="name" type="text" required class="border">
          <input type="submit">
        </div>
      </form>
    </div>
    <div class="p-4">
      <ul class="list-disc">
        <li v-for="category in categories" :key="category.id">
          {{ category.name }} -
          <button @click.prevent="removeCategory(category)">
            REMOVE
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  asyncData({ app, error }) {
    return app.$repositories.category.index()
      .then((response) => {
        return {
          categories: response.data
        }
      })
      .catch((e) => {
        error(e)
      })
  },
  methods: {
    onSubmit() {
      console.log('hello world')
      this.$repositories.category.create({ name: this.name })
        .then((response) => {
          this.categories.push(response.data)
          this.name = ''
        })
        .catch((e) => {
          console.error(e)
        })
    },
    removeCategory(category) {
      const index = this.categories.findIndex(c => c.id === category.id)
      console.log('index => ', index)
      console.log('before remove category')
      this.$repositories.category.delete(category.id)
        .then((response) => {
          this.categories.splice(index, 1)
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }
}
</script>

<style>

</style>
