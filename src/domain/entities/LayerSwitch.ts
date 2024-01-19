import { IP } from '../valueObjects/IP';
import Network from '../valueObjects/Network';
import Equipment from './Equipment';

export default class LayerSwitch extends Equipment {
  private networks: Network[] = [];

  constructor(e: Equipment) {
    super(
      e.getId(),
      e.getModel(),
      e.getIp(),
      e.getNumberOfPorts(),
      e.getLocation(),
    );
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
