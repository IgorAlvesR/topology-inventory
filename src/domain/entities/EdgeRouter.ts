import Router from './Router';
import Switch from './Switch';
import HasNetworkOnSwitch from './rules/IsSwitchEmptyRule';
import HasPortsAvailableRule from './rules/HasPortsAvailableRule';
import IsIpInRangeRule from './rules/IsIpAvailableRule';

export default class EdgeRouter extends Router {
  private switches: Switch[] = [];

  getEquipments(): Switch[] {
    return [...this.switches];
  }

  addSwitch(_switch: Switch): void {
    new IsIpInRangeRule(this.getIp(), _switch.getIp()).passOrThrow();
    new HasPortsAvailableRule(
      this.switches.length,
      this.getNumberOfPorts(),
    ).passOrThrow();
    this.switches.push(_switch);
  }

  removeSwitch(sw: Switch): void {
    new HasNetworkOnSwitch(sw).passOrThrow();
    this.switches = this.switches.filter((it) => it.getId() !== sw.getId());
  }
}
