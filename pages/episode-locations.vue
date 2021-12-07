<template>
  <v-container>
    <v-row class="my-5">
      <div class="text-center highlight mx-auto">
        <h1>Episode Locations</h1>
        <h4 v-if="!fetchingDone"><v-progress-linear indeterminate class="my-10"></v-progress-linear></h4>
        <h4 v-else>Program duration: {{ programDuration }} milliseconds</h4>
      </div>
    </v-row>
    <v-row class="mb-8">
      <v-col v-for="episode in episodeResults" :key="episode.name" md="4">
        <EpisodeLocationCard :episode="episode" />
      </v-col>
    </v-row>
    <v-row v-if="fetchingMore" class="mb-5">
      <v-col class="text-center">
        <v-progress-circular indeterminate></v-progress-circular>
        <p class="mt-3"> ⌛ Loading more awesome episodes...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Episode } from '~/models/episode'
import { calculateDuration } from '~/utils/timeUtils'
import EpisodeLocationCard from '~/components/EpisodeLocationCard.vue'

export default Vue.extend({
  components: {
    EpisodeLocationCard
  },
  data() {
    return {
      nextEpisodesPage:  '',
      episodeCount: null,
      episodeResults: [] as Episode[],
      fetchingDone: false,
      fetchingMore: false,
      processTimes: [] as number[]
    }
  },
  computed: {
    programDuration(): number {
      return this.processTimes.length === 0 ? 0 : this.processTimes.reduce( (a,b) => a + b);
    }
  },
  mounted() {
    this.getEpisodes();
    this.$nextTick(function() {
        window.addEventListener('scroll', this.scrollListener);
        this.scrollListener();
    });
  },
  beforeDestroy() {
      window.removeEventListener('scroll', this.scrollListener);
  },
  methods: {
    scrollListener() {
      const bottom = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottom && this.fetchingDone && !this.fetchingMore) this.fetchMoreEpisodes();
    },
    async getEpisodes() {
      const startTime = await new Date();
      this.fetchingDone = false;
      (this as any).$repositories.episodeLocations()
        .then ((resEpisodes: { data: { episodes: Episode[]; next: string } }) => {
          this.episodeResults = resEpisodes.data.episodes;
          this.nextEpisodesPage = resEpisodes.data.next;
        })
        .catch((err: any) => {
          console.error('ERROR in getAllLocations()', err)
        }).finally( () => {
          this.fetchingDone = true;
          this.processTimes.push(calculateDuration(startTime, new Date()))
        })
    },

    async fetchMoreEpisodes() {
      if (this.nextEpisodesPage && !this.fetchingMore) {
        this.fetchingMore = true;
        const startTime = await new Date();
        (this as any).$repositories.moreEpisodeLocations(this.nextEpisodesPage)
          .then((res: any) => {
            this.episodeResults.push(...res.data.episodes);
            this.nextEpisodesPage = res.data.next ||null;

          })
          .catch((err: any) => {
            console.error('ERROR fetching more episodes',err);
          })
          .finally(() => {
            this.fetchingMore = false;
            this.processTimes.push(calculateDuration(startTime, new Date()))
          })
      }
    }
  },
})
</script>
