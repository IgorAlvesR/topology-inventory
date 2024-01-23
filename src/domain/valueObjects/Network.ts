import { IP } from './IP';

export default class Network {
  constructor(
    readonly name: string,
    readonly ip: IP,
    readonly cidr: number,
  ) {
    const isValidCidr = this.cidr >= 8 && this.cidr <= 31;
    if (!isValidCidr) {
      this.throwInvalidCidr();
    }
  }

  private throwInvalidCidr() {
    throw new Error('Cidr inválido.');
  }
}
