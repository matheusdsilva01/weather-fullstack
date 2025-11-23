export class CreateUserDTO {
  email: string;
  password: string;
  constructor(request: Partial<CreateUserDTO> = {}) {
    Object.assign(this, request);
  }
}
