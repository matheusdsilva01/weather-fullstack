import { Types } from 'mongoose';

export class UserDTO {
  _id: Types.ObjectId;
  name: string;
  email: string;
  constructor(partial: Partial<UserDTO> = {}) {
    Object.assign(this, partial);
  }
}
