import { ID } from '../valueObjects/ID';
import { IP } from '../valueObjects/IP';
import Location from '../valueObjects/Location';
import { Model } from '../valueObjects/Model';
import Network from '../valueObjects/Network';
import Equipment from './Equipment';
import ExistsNetwork from './roles/ExistsNetwork';
import HasPortsAvailable from './roles/HasPortsAvailable';

export default class Switch extends Equipment {
  private networks: Network[] = [];

  constructor(
    id: ID,
    model: Model,
    ip: IP,
    numberOfPorts: number,
    location: Location,
  ) {
    super(id, model, ip, numberOfPorts, location);
  }

  addNetwork(network: Network) {
    new ExistsNetwork(this.networks, network).passOrThrow();
    new HasPortsAvailable(
      this.networks.length,
      this.getNumberOfPorts(),
    ).passOrThrow();
    this.networks.push(network);
  }

  removeNetwork(ip: IP) {
    const filteredNetwork = this.networks.filter(
      (network) => network.ip !== ip,
    );
    this.networks = filteredNetwork;
  }
}
