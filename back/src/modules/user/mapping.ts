import { TypeMapper } from 'ts-mapper';
import { User } from './schemas/user.schema';
import { UserDTO } from './dto/user.dto';

class Mapper extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<User, UserDTO>()
      .map(
        (src) => src._id,
        (dest) => dest._id,
      )
      .map(
        (src) => src.name,
        (dest) => dest.name,
      )
      .map(
        (src) => src.email,
        (dest) => dest.email,
      );
  }
}

export const mapper = new Mapper();
