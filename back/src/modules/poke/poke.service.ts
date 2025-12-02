import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationResultDTO } from '../shared/dto/pagination-result.dto';
import { PokemonListResponseDTO } from './dto/pokemon-list-response.dto';
import { PokemonDTO } from './dto/pokemon.dto';
import { PaginationQueryDTO } from '../shared/dto/pagination-query.dto';
import { mapper } from './mapping';
import { PokemonResponseDTO } from './dto/pokemon-response.dto';

@Injectable()
export class PokeService {
  private readonly URL: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private readonly httpService: HttpService) {}

  async list(
    params: PaginationQueryDTO,
  ): Promise<PaginationResultDTO<Omit<PokemonDTO, 'id'>[]>> {
    const { data } = await firstValueFrom(
      this.httpService.get<PokemonListResponseDTO>(this.URL, {
        params: {
          limit: params.pageSize,
          offset: (params.page - 1) * params.pageSize,
        },
      }),
    );

    return new PaginationResultDTO<Omit<PokemonDTO, 'id'>[]>({
      items: data.results.map((pokemon) => ({
        name: pokemon.name,
      })),
      totalItems: data.count,
      currentPage: params.page,
      itemsPerPage: params.pageSize,
      totalPages: Math.ceil(data.count / params.pageSize),
    });
  }

  async getByName(name: string) {
    const { data } = await firstValueFrom(
      this.httpService.get<PokemonDTO>(`${this.URL}/${name}`).pipe(
        catchError(() => {
          throw new NotFoundException('Pokemon not found');
        }),
      ),
    );
    return mapper.map(data, new PokemonResponseDTO());
  }
}
