<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <small class="ml-2">{{ episode ? episode.episode : '' }}</small>
      <p class="display-1 text--primary">{{ episode ? episode.name : '' }}</p>
      <p>Episode characters origins</p>
      <v-slide-group v-if="episode && episode.origins">
        <v-chip
          v-bind:key="origin.name"
          v-for="origin in episode.origins"
          class="ma-2"
        >
          {{ origin.name }}
        </v-chip>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
name: 'EpisodeLocationCard',
  props: [
    'episode'
  ],
})
</script>