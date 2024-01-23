import Router from './Router';
import { ID } from '../valueObjects/ID';
import Switch from './Switch';

export default class EdgeRouter extends Router {
  private Switches: Switch[] = [];

  getSwitches() {
    return this.Switches;
  }

  addSwitch(Switch: Switch): void {
    this.Switches.push(Switch);
  }

  removeSwitch(id: ID) {
    this.Switches = this.Switches.filter(
      (Switch) => Switch.getId() !== id,
    );
  }
}
