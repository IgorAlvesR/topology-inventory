import { ID } from '../valueObjects/ID';
import { IP } from '../valueObjects/IP';
import Location from '../valueObjects/Location';
import { Model } from '../valueObjects/Model';

export default class Equipment {
  protected constructor(
    private readonly id: ID,
    private model: Model,
    private ip: IP,
    private readonly numberOfPorts: number,
    private location: Location,
  ) {}

  getIp(): IP {
    return this.ip;
  }

  getNumberOfPorts(): number {
    return this.numberOfPorts;
  }

  getId(): ID {
    return this.id;
  }
}
