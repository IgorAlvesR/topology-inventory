import { ID } from '../valueObjects/ID';
import { IP } from '../valueObjects/IP';
import Location from '../valueObjects/Location';
import { Model } from '../valueObjects/Model';
import Equipment from './Equipment';

export default class Router extends Equipment {
  constructor(
    id: ID,
    model: Model,
    ip: IP,
    numberOfPorts: number,
    location: Location,
  ) {
    super(id, model, ip, numberOfPorts, location);
  }
}
