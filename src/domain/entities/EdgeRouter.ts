import Router from './Router';
import Switch from './Switch';

export default class EdgeRouter extends Router {
  private switches: Switch[] = [];

  getEquipments() {
    return this.switches;
  }

  addSwitch(_switch: Switch): void {
    this.switches.push(_switch);
  }

  removeSwitch(_switch: Switch) {
    this.switches = this.switches.filter(
      (it) => it.getId() !== _switch.getId(),
    );
  }
}
