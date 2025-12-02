export interface PokemonListItem {
  name: string
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonType[]
}
