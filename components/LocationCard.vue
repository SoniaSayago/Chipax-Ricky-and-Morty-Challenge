<template>
  <v-card class="ma-2">
    <v-card-subtitle  class='font-weight-bold'>
      {{ location ? location.name : '' }}
    </v-card-subtitle>

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
