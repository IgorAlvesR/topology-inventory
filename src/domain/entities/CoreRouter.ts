import Router from './Router';
import HasPortsAvailableRule from './rules/HasPortsAvailableRule';
import IsIpInRangeRule from './rules/IsIpAvailableRule';
import HasEquipmentsConnectedToRouterRule from './rules/IsRouterEmptyRule';

export default class CoreRouter extends Router {
  private routers: Router[] = [];

  getEquipments(): Router[] {
    return [...this.routers];
  }

  addRouter(router: Router): void {
    new IsIpInRangeRule(this.getIp(), router.getIp()).passOrThrow();
    new HasPortsAvailableRule(
      this.routers.length,
      this.getNumberOfPorts(),
    ).passOrThrow();
    this.routers.push(router);
  }

  removeRouter(router: Router): void {
    new HasEquipmentsConnectedToRouterRule(router).passOrThrow();
    this.routers = this.routers.filter((it) => it.getId() !== router.getId());
  }
}
