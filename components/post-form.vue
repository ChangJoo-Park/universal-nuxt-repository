<template>
  <div class="flex w-full h-full">
    <form class="flex-1 p-4" @submit.prevent="submit">
      <h1 v-if="edit" class="text-3xl">Edit Post</h1>
      <h1 v-else class="text-3xl">New Post</h1>
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
          class="border border-gray-400 w-full outline-none focus:shadow-outline p-3"
          rows="20"
          required
        />
      </div>
      <div class="mb-4">
        <label for="published">
          <input id="published" v-model="published" type="checkbox"> Publish
        </label>
      </div>
      <input
        type="submit"
        class="px-2 py-1 border shadow cursor-pointer"
        :class="[edit ? 'border-green-400 bg-green-400 hover:bg-green-600' : 'border-blue-400 bg-blue-400 hover:bg-blue-600']"
      >
      <a href="#" @click.prevent="$router.back()">Back</a>
    </form>
    <div class="flex-1 border p-4 h-screen overflow-auto">
      <div class="p-4 text-4xl">
        {{ title }}
      </div>
      <post-content :content="body" class="p-4" />
    </div>
  </div>
</template>

<script>
import PostContent from '~/components/post-content.vue'

export default {
  components: {
    PostContent
  },
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
      published: false,
      edit: false
    }
  },
  created() {
    if (this.post) {
      this.title = this.post.title
      this.body = this.post.body
      this.published = this.post.published
      this.edit = true
    }
  },
  methods: {
    submit() {
      this.$emit('submit', { title: this.title, body: this.body, published: this.published })
    }
  }
}
</script>

<style>
</style>
