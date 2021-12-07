<template>
  <v-card class="ma-2">
    <v-card-subtitle  class='font-weight-bold'>
      {{ character ? character.name : '' }}
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  name: 'CharacterCard',
  props: [
    'character'
  ],
})

</script>
