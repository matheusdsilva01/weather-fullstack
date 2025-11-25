export class UpdateUserDTO {
  name: string;
  constructor(request: Partial<UpdateUserDTO> = {}) {
    Object.assign(this, request);
  }
}
