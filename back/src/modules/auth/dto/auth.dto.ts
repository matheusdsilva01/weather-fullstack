export class AuthDTO {
  access_token: string;
  constructor(request: Partial<AuthDTO> = {}) {
    Object.assign(this, request);
  }
}
