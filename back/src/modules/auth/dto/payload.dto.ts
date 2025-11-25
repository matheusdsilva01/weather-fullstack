export class PayloadDTO {
  sub: string;
  name: string;
  email: string;
  constructor(request: Partial<PayloadDTO> = {}) {
    Object.assign(this, request);
  }
}
