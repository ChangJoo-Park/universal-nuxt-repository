<template>
  <table v-if="hasData" class="w-full border border-2 text-center">
    <thead class="w-full border border-b-2 bg-gray-300">
      <tr>
        <th
          v-for="key in keys"
          :key="key"
          class="p-2 font-mono"
        >
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody class="w-full">
      <tr v-for="(row, index) in data" :key="index">
        <td
          v-for="key in keys"
          :key="key"
          class="p-2 border-b-2"
        >
          {{ row[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasData() {
      if (!this.data) {
        return false
      }
      return !!this.data || this.data.length > 0
    },
    keys() {
      if (!this.hasData) {
        return []
      }
      return Object.keys(this.data[0])
    }
  }
}
</script>

<style>

</style>
