<template>
  <v-card class="ma-2">
    <v-card-title>
      {{ character ? character.name : '' }}
    </v-card-title>
    <v-card-text>
      <div class="pa-5" style="min-width: 200px">
        <v-row>
          <v-col>
            <div>
              Origin
            </div>
            <div>
              <strong>{{ character && character.origin ? character.origin.name : ''}}</strong>
            </div>
          </v-col>
          <v-col>
            <div>
              Appears in
            </div>
            <div>
              <strong>{{ character && character.episode ? character.episode.length : ''}} episodes</strong>
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
  name: 'CharacterCard',
  props: [
    'character'
  ],
})

</script>
