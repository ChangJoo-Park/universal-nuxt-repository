<template>
  <form @submit.prevent="submit">
    <div class="mb-4">
      <input
        v-model="title"
        type="text"
        required
        autofocus
        class="border border-gray-400 w-full outline-none focus:shadow-outline p-3 text-xl"
      >
    </div>
    <div class="mb-4">
      <textarea
        id=""
        v-model="body"
        name=""
        class="border border-gray-400 w-full outline-none focus:shadow-outline p-3 text-xl"
        cols="30"
        rows="10"
        required
      />
    </div>
    <input
      type="submit"
      class="px-2 py-1 border shadow cursor-pointer"
      :class="[edit ? 'border-green-400 bg-green-400 hover:bg-green-600' : 'border-blue-400 bg-blue-400 hover:bg-blue-600']"
    >
    <a href="#" @click.prevent="$router.back()">Back</a>
  </form>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: false,
      default: () => null
    }
  },
  data() {
    return {
      title: '',
      body: '',
      edit: false
    }
  },
  created() {
    if (this.post) {
      this.title = this.post.title
      this.body = this.post.body
      this.edit = true
    }
  },
  methods: {
    submit() {
      this.$emit('submit', { title: this.title, body: this.body })
    }
  }
}
</script>

<style>

</style>
