<template>
  <div class="container mx-auto flex">
    <div class="flex-none" style="min-width: 280px;">
      <h1>
        {{ user.username }}
        {{ user.email }}
      </h1>
    </div>
    <div>
      <div>
        <ul>
          <li class="inline-block">
            <nuxt-link :to="{ name: 'users-username', params: { username: user.username} }">
              Overview
            </nuxt-link>
          </li>
          <li class="inline-block">
            <nuxt-link :to="{ name: 'users-username-series', params: { username: user.username} }">
              Series
            </nuxt-link>
          </li>
          <li class="inline-block">
            <nuxt-link :to="{ name: 'users-username-posts', params: { username: user.username} }">
              Posts
            </nuxt-link>
          </li>
          <template v-if="sameUser">
            <li class="inline-block">
              <nuxt-link :to="{ name: 'users-username-setting', params: { username: user.username} }">
                Setting
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      authenticated: 'authenticated',
      loggedInUser: 'user'
    }),
    sameUser() {
      return this.authenticated && this.loggedInUser.id === this.user.id
    }
  },
  asyncData({ app: { $repositories }, params, error }) {
    console.log('params -> username => ', params.username)
    return $repositories.user.show(params.username)
      .then((response) => {
        return {
          user: response.data
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
