import { ID } from '../valueObjects/ID';
import { IP } from '../valueObjects/IP';
import Location from '../valueObjects/Location';
import { Model } from '../valueObjects/Model';
import Network from '../valueObjects/Network';
import Equipment from './Equipment';

export default class LayerSwitch extends Equipment {
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

  addNetworks(network: Network[]) {
    this.networks.push(...network);
  }

  removeNetwork(ip: IP) {
    const filteredNetwork = this.networks.filter(
      (network) => network.ip !== ip,
    );
    this.networks = filteredNetwork;
  }
}
