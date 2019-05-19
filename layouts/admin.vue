<template>
  <div id="admin" class="w-screen h-screen flex">
    <aside class="bg-gray-400 w-48 flex flex-col shadow-xl" style="min-width: 12rem;">
      <div class="border-b-2">
        <h1 class="font-mono text-2xl text-center my-4">
          ADMIN
        </h1>
      </div>
      <nav class="flex-1 mb-4">
        <ul>
          <nuxt-link
            tag="li"
            :to="{ name: 'admin-users' }"
            class="p-3 cursor-pointer bg-gray-500 hover:bg-blue-600 text-white text-xl mb-2"
          >
            Users
          </nuxt-link>
          <nuxt-link
            tag="li"
            :to="{ name: 'admin-categories' }"
            class="p-3 cursor-pointer bg-gray-500 hover:bg-blue-600 text-white text-xl mb-2"
          >
            Categories
          </nuxt-link>
          <nuxt-link
            tag="li"
            :to="{ name: 'admin-posts' }"
            class="p-3 cursor-pointer bg-gray-500 hover:bg-blue-600 text-white text-xl"
          >
            Posts
          </nuxt-link>
        </ul>
      </nav>
      <div class="font-mono text-center mb-4">
        SETTING
      </div>
      <div class="font-mono text-center mb-4">
        <nuxt-link :to="{ name: 'index' }">
          GO TO HOME
        </nuxt-link>
      </div>
    </aside>
    <main class="flex-1 p-4">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss">
#admin .nuxt-link-exact-active {
  @apply bg-blue-900 !important;
}
</style>
