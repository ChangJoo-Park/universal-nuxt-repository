<template>
  <div class="mb-3">
    <div v-if="authenticated">
      <nuxt-link :to="{ name: 'posts-new' }" class="text-blue-500 underline">
        NEW POST
      </nuxt-link>
    </div>
    <div v-else>
      <nuxt-link :to="{ name: 'login' }" class="text-blue-500 underline">
        LOGIN
      </nuxt-link>
      <nuxt-link :to="{ name: 'signup' }" class="text-blue-500 underline">
        SIGN UP
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['authenticated'])
  }
}
</script>

<style>

</style>
