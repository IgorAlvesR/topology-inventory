import { IP } from './IP';

export default class Network {
  constructor(
    readonly name: string,
    readonly ip: IP,
    readonly cidr: number,
  ) {}
}
