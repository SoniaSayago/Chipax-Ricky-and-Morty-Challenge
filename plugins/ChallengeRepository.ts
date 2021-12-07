import RickMortyRepository from '~/api/RickMortyRepository'
import LambdaRepository from '~/api/LambdaRepository'

export default (ctx: any, inject: any) => {
 // Here we will do it
    const rickMortyRepository = RickMortyRepository(ctx.$axios)
    const lambdaRepository = LambdaRepository(ctx.$axios)

    const repositories = {
        characters  : rickMortyRepository.getCharacters,
        episodes    : rickMortyRepository.getEpisodes,
        locations   : rickMortyRepository.getLocations,
        episodeLocations : lambdaRepository.getEpisodeLocations,
        moreEpisodeLocations : lambdaRepository.getMoreEpisodes
    }

    inject('repositories', repositories)
}