<template>
  <v-card class="ma-2">
    <v-card-subtitle  class='font-weight-bold'>
      {{ episode ? episode.name : '' }}
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  name: 'EpisodeCard',
  props: [
    'episode'
  ],
})

</script>
