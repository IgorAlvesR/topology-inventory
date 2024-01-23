import Router from './Router';
import { ID } from '../valueObjects/ID';
import Switch from './Switch';

export default class EdgeRouter extends Router {
  private switches: Switch[] = [];

  getSwitches() {
    return this.switches;
  }

  addSwitch(Switch: Switch): void {
    this.switches.push(Switch);
  }

  removeSwitch(id: ID) {
    this.switches = this.switches.filter((it) => it.getId() !== id);
  }
}
