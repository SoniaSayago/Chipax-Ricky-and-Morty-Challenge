<template>
  <v-card class="ma-2">
    <v-card-title>
      {{ episode ? episode.name : '' }}
    </v-card-title>
    <v-card-text>
      <div class="pa-5">
        <v-row>
          <v-col>
            <div>Episode</div>
            <div>
              <strong>{{episode ? episode.episode : ''}}</strong>
            </div>
          </v-col>
          <v-col>
            <div>Characters</div>
            <div>
              <strong>{{ episode && episode.characters ? episode.characters.length : ''}}</strong>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div>
              Air date
            </div>
            <div>
              <strong>{{ episode ? episode.air_date : ''}}</strong>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
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