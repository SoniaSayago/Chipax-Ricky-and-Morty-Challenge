<template>
  <v-card class="ma-2">
    <v-card-title>
      {{ location ? location.name : '' }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  name: 'LocationCard',
  props: [
    'location'
  ],
})

</script>
