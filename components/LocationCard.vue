<template>
  <v-card class="ma-2">
    <v-card-title>
      {{ location ? location.name : '' }}
    </v-card-title>
    <v-card-text>
      <div class="pa-5">
        <v-row>
          <v-col>
            <div>Type</div>
            <div><strong>{{ location ? location.type : ''}}</strong></div>
          </v-col>
          <v-col>
            <div>Residents</div>
            <div><strong>{{ location && location.residents ? location.residents.length : ''}}</strong></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div>Dimension</div>
            <div><strong>{{ location ? location.dimension : '' }}</strong></div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
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