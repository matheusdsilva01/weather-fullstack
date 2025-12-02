import { TypeMapper } from 'ts-mapper';
import { PokemonResponseDTO } from './dto/pokemon-response.dto';

class Mapper extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<PokemonResponseDTO, PokemonResponseDTO>()
      .map(
        (src) => src.id,
        (dest) => dest.id,
      )
      .map(
        (src) => src.name,
        (dest) => dest.name,
      )
      .map(
        (src) => src.height,
        (dest) => dest.height,
      )
      .map(
        (src) => src.types,
        (dest) => dest.types,
      )
      .map(
        (src) => src.weight,
        (dest) => dest.weight,
      );
  }
}

export const mapper = new Mapper();
