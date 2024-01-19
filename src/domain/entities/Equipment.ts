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

  getModel() {
    return this.model;
  }

  setModel(model: Model) {
    this.model = model;
  }

  getIp() {
    return this.ip;
  }

  setIp(ip: IP) {
    this.ip = ip;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location: Location) {
    this.location = location;
  }

  getNumberOfPorts() {
    return this.numberOfPorts;
  }

  getId() {
    return this.id;
  }
}
