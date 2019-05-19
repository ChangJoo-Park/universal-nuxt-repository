<template>
  <div class="w-screen h-screen flex">
    <aside class="bg-gray-400 w-48 flex flex-col shadow-xl">
      <div class="border-b-2">
        <h1 class="font-mono text-2xl text-center my-4 ">
          ADMIN
        </h1>
      </div>
      <nav class="flex-1 mb-4 p-3">
        <ul>
          <nuxt-link tag="li" :to="{ name: 'admin-users' }">
            Users
          </nuxt-link>
          <nuxt-link tag="li" :to="{ name: 'admin-posts' }">
            Posts
          </nuxt-link>
        </ul>
      </nav>
      <div class="font-mono text-center mb-4">
        SETTING
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
