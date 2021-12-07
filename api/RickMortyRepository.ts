import { Character } from "~/models/character"
import { Episode } from "~/models/episode"
import { Location } from "~/models/Location"

export function getAllEpisodes(axios: any, cursor: string, query: string, data = [] as Episode[]) : Promise<Episode[]>{
  const nextPage = cursor ? cursor.split('/').pop()! : ''
  const url = nextPage ? `episode/${nextPage}` : `episode/?name=${query}`
  return axios.get(url)
    .then((response: any) => {
      data.push(...response.data.results)
        if (!response.data.info.next ) return data
        return getAllEpisodes(axios, response.data.info.next, query, data)
    })
}

export function getAllCharacters(axios: any, cursor: string, query: string, data = [] as Character[]) : Promise<Character[]>{
  const nextPage = cursor ? cursor.split('/').pop()! : ''
  const url = nextPage ? `character/${nextPage}` : `character/?name=${query}`
  return axios.get(url)
    .then((response: any) => {
      data.push(...response.data.results)
        if (!response.data.info.next ) return data
        return getAllCharacters(axios, response.data.info.next, query, data)
    })
}

export function getAllLocations(axios: any, cursor: string, query: string, data = [] as Location[]) : Promise<Location[]>{
  const nextPage = cursor ? cursor.split('/').pop()! : ''
  const url = nextPage ? `location/${nextPage}` : `location/?name=${query}`
  return axios.get(url)
    .then((response: any) => {
      data.push(...response.data.results)
        if (!response.data.info.next ) return data
        return getAllLocations(axios, response.data.info.next, query, data)
    })
}

export default ($axios: any) => ({
  
  getEpisodes(query: string) {
    return getAllEpisodes($axios, '', query)
  },

  getCharacters(query: string) {
    return getAllCharacters($axios, '', query)
  },

  getLocations(query: string) {
    return getAllLocations($axios, '', query)
  }


  

  

  
})
