export class SignInDTO {
  email: string;
  password: string;
  constructor(request: Partial<SignInDTO> = {}) {
    Object.assign(this, request);
  }
}
