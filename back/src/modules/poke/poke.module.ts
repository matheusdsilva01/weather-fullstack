import { Module } from '@nestjs/common';
import { PokeController } from './poke.controller';
import { PokeService } from './poke.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PokeController],
  providers: [PokeService],
})
export class PokeModule {}
