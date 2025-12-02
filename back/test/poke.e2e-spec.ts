import { HttpService } from '@nestjs/axios';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { InternalAxiosRequestConfig } from 'axios';
import { of, throwError } from 'rxjs';
import { PokemonResponseDTO } from 'src/modules/poke/dto/pokemon-response.dto';
import { PokemonDTO } from 'src/modules/poke/dto/pokemon.dto';
import { PaginationResultDTO } from 'src/modules/shared/dto/pagination-result.dto';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AxiosError } from 'axios';

describe('PokeController (e2e)', () => {
  let app: NestExpressApplication;
  let httpService: HttpService;

  const mockPokemonListResponse = {
    count: 1302,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    ],
  };

  const mockPokemonDetailResponse = {
    id: 25,
    name: 'pikachu',
    weight: 60,
    height: 4,
    types: [
      {
        slot: 1,
        type: {
          name: 'electric',
          url: 'https://pokeapi.co/api/v2/type/13/',
        },
      },
    ],
    sprites: {},
    abilities: [],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpService = app.get<HttpService>(HttpService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/poke (GET)', () => {
    it('should return a paginated list of pokemon', async () => {
      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          data: mockPokemonListResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        }),
      );
      const params = { page: 1, pageSize: 20 };
      const response = await request(app.getHttpServer())
        .get('/poke')
        .query({ page: params.page, pageSize: params.pageSize })
        .expect(200);

      const body = response.body as PaginationResultDTO<PokemonDTO[]>;

      expect(body).toHaveProperty('items');
      expect(body).toHaveProperty('currentPage');
      expect(body.items[0]).toHaveProperty('name', 'bulbasaur');
      expect(body.currentPage).toBe(params.page);
      expect(body.itemsPerPage).toBe(params.pageSize);
    });

    it('should return paginated list with custom page size', async () => {
      const customListResponse = {
        count: 1302,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          data: customListResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        }),
      );
      const params = { page: 1, pageSize: 10 };
      const response = await request(app.getHttpServer())
        .get('/poke')
        .query({ page: params.page, pageSize: params.pageSize })
        .expect(200);
      const body = response.body as PaginationResultDTO<PokemonDTO[]>;

      expect(body.itemsPerPage).toBe(params.pageSize);
      expect(body.totalPages).toBe(Math.ceil(1302 / params.pageSize));
    });
  });

  describe('/poke/:name (GET)', () => {
    it('should return pokemon details by name', async () => {
      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          data: mockPokemonDetailResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        }),
      );

      const response = await request(app.getHttpServer())
        .get('/poke/pikachu')
        .expect(200);
      const body = response.body as PokemonResponseDTO;

      expect(body).toHaveProperty('id', 25);
      expect(body).toHaveProperty('name', 'pikachu');
      expect(body).toHaveProperty('weight', 60);
      expect(body).toHaveProperty('height', 4);
      expect(body).toHaveProperty('types');
      expect(Array.isArray(body.types)).toBe(true);
    });

    it('should handle pokemon not found', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(() => new AxiosError('not found')));

      await request(app.getHttpServer())
        .get('/poke/nonexistentpokemon')
        .expect(404);
    });
  });
});
