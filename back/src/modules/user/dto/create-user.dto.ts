export class CreateUserDTO {
  email: string;
  name: string;
  password: string;
  constructor(request: Partial<CreateUserDTO> = {}) {
    Object.assign(this, request);
  }
}
