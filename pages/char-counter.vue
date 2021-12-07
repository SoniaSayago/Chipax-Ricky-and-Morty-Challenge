<template>

<v-container>
  <v-row class="my-5">
    <div class="text-center highlight mx-auto">
      <h1>Char counter</h1>
      <h4>Program duration: {{ programDuration }} milliseconds</h4>
    </div>
  </v-row>

  <v-row class="mb-8">
    <v-col>
      <v-card color="rgb(0, 0, 0, 0.2)">
        <v-card-title>
          <h4 class="custom-title">Locations with '{{locationQuery}}' matches</h4>
          <v-spacer></v-spacer>
          <v-chip class="ma-2" color="green" text-color="white">
            <v-avatar left class="green darken-4">
              {{locationCount}}
            </v-avatar>
            locations
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-slide-group v-if="locationResults.length" show-arrows>
            <v-slide-item v-bind:key="location.name" v-for="location in locationResults">
              <LocationCard :location="location" />
            </v-slide-item>
          </v-slide-group>
          <v-slide-group v-else>
            <v-slide-item v-bind:key="i" v-for="i in loadingCards">
              <LoadingCard />
            </v-slide-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mb-8">
    <v-col>
      <v-card color="rgb(0, 0, 0, 0.2)">
        <v-card-title>
          <h4 class="custom-title">Episodes with '{{episodeQuery}}' matches</h4>
          <v-spacer></v-spacer>
          <v-chip class="ma-2" color="green" text-color="white">
            <v-avatar left class="green darken-4">
              {{episodeCount}}
            </v-avatar>
            episodes
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-slide-group v-if="episodeResults.length" show-arrows>
            <v-slide-item v-bind:key="episode.name" v-for="episode in episodeResults">
              <EpisodeCard :episode="episode" />
            </v-slide-item>
          </v-slide-group>
          <v-slide-group v-else>
            <v-slide-item v-bind:key="i" v-for="i in loadingCards">
              <LoadingCard />
            </v-slide-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mb-8">
    <v-col>
      <v-card color="rgb(0, 0, 0, 0.2)">
        <v-card-title>
          <h4 class="custom-title">Characters with '{{characterQuery}}' matches</h4>
          <v-spacer></v-spacer>
          <v-chip class="ma-2" color="green" text-color="white">
            <v-avatar left class="green darken-4">
              {{characterCount}}
            </v-avatar>
            characters
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-slide-group v-if="characterResults.length" show-arrows>
            <v-slide-item v-bind:key="character.name+index" v-for="(character, index) in characterResults">
              <CharacterCard :character="character" />
            </v-slide-item>
          </v-slide-group>
          <v-slide-group v-else>
            <v-slide-item v-bind:key="i" v-for="i in loadingCards">
              <LoadingCard />
            </v-slide-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

</v-container>

</template>

<script lang="ts">

import Vue from 'vue'
import LoadingCard from '~/components/LoadingCard.vue';
import LocationCard from '~/components/LocationCard.vue';
import EpisodeCard from '~/components/EpisodeCard.vue';
import CharacterCard from '~/components/CharacterCard.vue';
import { Location } from '~/models/Location';
import { Episode } from '~/models/episode';
import { Character } from '~/models/character';
import { calculateDuration } from '~/utils/timeUtils'
import { countCharsInName } from '~/utils/charCounter'

export default Vue.extend({
  name: 'CharCounterPage',
  components: {
    LoadingCard,
    LocationCard,
    EpisodeCard,
    CharacterCard
  },
  computed: {
    programDuration(): number {
      return calculateDuration(this.startTime, this.finishTime);
    },
    locationCount(): number {
      if (!this.locationResults || !this.locationResults.length) return 0;
      return countCharsInName(this.locationResults, this.locationQuery)
    },
    episodeCount(): number {
      if (!this.episodeResults || !this.episodeResults.length) return 0;
      return countCharsInName(this.episodeResults, this.episodeQuery)
    },
    characterCount(): number {
      if (!this.characterResults || !this.characterResults.length) return 0;
      return countCharsInName(this.characterResults, this.characterQuery)
    },
  },
  data() {
    return {
      locationQuery: 'l',
      episodeQuery: 'e',
      characterQuery: 'c',

      locationResults: <Location[]>[],
      episodeResults: <Episode[]>[],
      characterResults: <Character[]>[],
      startTime: new Date(),
      finishTime: new Date(),

      loadingCards: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  mounted() {
    this.startTime = new Date();
    this.getLocations();
    this.getEpisodes();
    this.getCharacters();
  },
  methods: {
    async getLocations() {
      (this as any).$repositories.locations(this.locationQuery).then(
        (resLocations: Location[]) => {
          this.locationResults = resLocations;
        }
      )
      .catch( (err: any) => {
        console.error('ERROR in getAllLocations()', err);
      }).finally(() => this.finishTime = new Date());
    },

    async getEpisodes() {
      (this as any).$repositories.episodes(this.episodeQuery).then(
        (resEpisodes: Episode[]) => {
          this.episodeResults = resEpisodes;
        }
      )
      .catch( (err: any) => {
        console.error('ERROR in getAllEpisodes()', err);
      }).finally(() => this.finishTime = new Date());
    },
    
    async getCharacters() {
      (this as any).$repositories.characters(this.characterQuery).then(
        (resCharacters: Character[]) => {
          this.characterResults = resCharacters;
        }
      )
      .catch( (err: any) => {
        console.error('ERROR in getAllCharacters()', err);
      })
      .finally(() => this.finishTime = new Date());
    },
  },
})

</script>