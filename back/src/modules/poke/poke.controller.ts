import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationResultDTO } from '../shared/dto/pagination-result.dto';
import { PokemonDTO } from './dto/pokemon.dto';
import { PokeService } from './poke.service';

@Controller('poke')
export class PokeController {
  constructor(private readonly pokeService: PokeService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: PaginationResultDTO<Omit<PokemonDTO, 'id'>[]>,
  })
  list(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 20,
  ) {
    return this.pokeService.list({
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  @Get('/:name')
  @ApiResponse({ status: 200, type: PokemonDTO })
  @ApiResponse({ status: 404, description: 'Pokemon not found' })
  getByName(@Param('name') name: string) {
    return this.pokeService.getByName(name);
  }
}
