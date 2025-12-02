import { api } from '@/lib/api'
import type { PaginationResult } from '@/types/pagination'
import type { PokemonDetails, PokemonListItem } from '@/types/poke'

type PokemonListParams = {
  page?: number
  pageSize?: number
}

export async function getPokemonList(params: PokemonListParams) {
  const { page = 1, pageSize = 20 } = params
  const response = await api.get<PaginationResult<PokemonListItem[]>>('/poke', {
    params: {
      page,
      pageSize
    }
  })

  return response.data
}

export async function getPokemonDetails(name: string) {
  const response = await api.get<PokemonDetails>(`/poke/${name}`)
  return response.data
}
