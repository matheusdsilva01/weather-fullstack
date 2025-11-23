export class PayloadDTO {
  sub: string;
  email: string;
  constructor(request: Partial<PayloadDTO> = {}) {
    Object.assign(this, request);
  }
}
