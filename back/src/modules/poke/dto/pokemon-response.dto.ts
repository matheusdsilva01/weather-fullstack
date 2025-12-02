export class PokemonResponseDTO {
  name: string;
  id: number;
  weight: number;
  height: number;
  types: { type: { name: string }; slot: number }[];
}
