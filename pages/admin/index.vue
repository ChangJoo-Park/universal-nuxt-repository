<template>
  <div>
    ADMIN
    <div>
      {{ user }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    console.log('hello world')
  }
}
</script>

<style>

</style>
