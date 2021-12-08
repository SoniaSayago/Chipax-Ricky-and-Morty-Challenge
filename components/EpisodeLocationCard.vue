<template>
  <v-card >
    <v-card-title>
    </v-card-title>
    <v-card-text elevation="2">
      <small class="ml-2">{{ episode ? episode.episode : '' }}</small>
      <p class="text-md-h5 font-weight-bold text--primary">{{ episode ? episode.name : '' }}</p>
      <div>Appears <strong>{{ episode && episode.characters ? episode.characters.length : ''}} characters</strong>
      </div>
      <p>Episode characters origins</p>
      <v-slide-group v-if="episode && episode.origins">
        <v-chip
          v-for="origin in episode.origins"
          :key="origin.name"
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
