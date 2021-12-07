export default ($axios: any) => ({
  
    getEpisodeLocations() {
        return $axios.get('https://ys9a1rlgc8.execute-api.us-east-1.amazonaws.com/dev/chipax-challenge/episode-locations')
    },
    getMoreEpisodes(page: string) {
        return $axios.get(`https://ys9a1rlgc8.execute-api.us-east-1.amazonaws.com/dev/chipax-challenge/episode-locations/${page}`)
    }
})
  